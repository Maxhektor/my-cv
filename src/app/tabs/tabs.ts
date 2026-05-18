import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  model,
  viewChildren,
} from '@angular/core';

export interface TabItem {
  id: string;
  label: string;
}

@Component({
  selector: 'app-tabs',
  standalone: true,
  templateUrl: './tabs.html',
  styleUrl: './tabs.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
  readonly tabs = input.required<readonly TabItem[]>();
  readonly activeId = model.required<string>();
  readonly listLabel = input<string>('Sections');

  private readonly tabButtons = viewChildren<ElementRef<HTMLButtonElement>>('tabButton');

  panelId(id: string): string {
    return `panel-${id}`;
  }

  tabId(id: string): string {
    return `tab-${id}`;
  }

  select(id: string): void {
    this.activeId.set(id);
  }

  onKeydown(event: KeyboardEvent): void {
    const tabs = this.tabs();
    const currentIndex = tabs.findIndex((tab) => tab.id === this.activeId());
    if (currentIndex === -1) {
      return;
    }

    let nextIndex: number | null = null;
    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (currentIndex + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const target = tabs[nextIndex];
    if (target === undefined) {
      return;
    }
    this.activeId.set(target.id);
    queueMicrotask(() => {
      const button = this.tabButtons()[nextIndex!]?.nativeElement;
      button?.focus();
    });
  }
}
