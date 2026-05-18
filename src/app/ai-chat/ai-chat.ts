import { ChangeDetectionStrategy, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { marked } from 'marked';
import { LanguageService } from '../i18n/language.service';

marked.setOptions({ gfm: true, breaks: true });

const WORKER_URL =
  typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:8787'
    : 'https://cv-ai-worker-production.maxhektor.workers.dev';

type ChatStatus = 'idle' | 'streaming' | 'error';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ai-chat.html',
  styleUrl: './ai-chat.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiChatComponent {
  protected readonly i18n = inject(LanguageService);

  protected readonly question = signal('');
  protected readonly messages = signal<readonly ChatMessage[]>([]);
  protected readonly status = signal<ChatStatus>('idle');

  private readonly threadEl = viewChild<ElementRef<HTMLDivElement>>('threadEl');
  private abortController: AbortController | null = null;

  protected useSuggestion(suggestion: string): void {
    this.question.set(suggestion);
  }

  protected renderMarkdown(content: string): string {
    return marked.parse(content, { async: false }) as string;
  }

  protected clear(): void {
    if (this.status() === 'streaming') {
      this.abortController?.abort();
    }
    this.messages.set([]);
    this.question.set('');
    this.status.set('idle');
  }

  protected stop(): void {
    if (this.status() !== 'streaming') return;
    this.abortController?.abort();
    this.status.set('idle');
    // Drop a trailing empty assistant placeholder if streaming was cancelled before any tokens arrived.
    this.messages.update((prev) => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1]!;
      if (last.role === 'assistant' && last.content.length === 0) {
        return prev.slice(0, -1);
      }
      return prev;
    });
  }

  protected onEnter(event: Event): void {
    if ((event as KeyboardEvent).shiftKey) {
      return;
    }
    event.preventDefault();
    void this.submit();
  }

  protected async submit(): Promise<void> {
    const q = this.question().trim();
    if (!q || this.status() === 'streaming') {
      return;
    }

    this.abortController?.abort();
    this.abortController = new AbortController();

    // Append the user turn + an empty assistant placeholder we stream into.
    this.messages.update((prev) => [
      ...prev,
      { role: 'user', content: q },
      { role: 'assistant', content: '' },
    ]);
    this.question.set('');
    this.status.set('streaming');
    this.scrollToBottom();

    // Strip the trailing empty assistant before sending — server expects user-last.
    const outgoing = this.messages().slice(0, -1);

    try {
      const response = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: outgoing }),
        signal: this.abortController.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error(`HTTP ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split('\n\n');
        buffer = events.pop() ?? '';
        for (const event of events) {
          for (const line of event.split('\n')) {
            if (!line.startsWith('data: ')) continue;
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            try {
              const parsed = JSON.parse(data) as { text?: unknown };
              if (typeof parsed.text === 'string') {
                this.appendToLastAssistant(parsed.text);
                this.scrollToBottom();
              }
            } catch {
              // ignore malformed event
            }
          }
        }
      }

      this.status.set('idle');
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        return;
      }
      console.error('AI chat error:', err);
      this.status.set('error');
    }
  }

  private appendToLastAssistant(chunk: string): void {
    this.messages.update((prev) => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1]!;
      if (last.role !== 'assistant') return prev;
      const updated: ChatMessage = { role: 'assistant', content: last.content + chunk };
      return [...prev.slice(0, -1), updated];
    });
  }

  private scrollToBottom(): void {
    queueMicrotask(() => {
      const el = this.threadEl()?.nativeElement;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    });
  }
}
