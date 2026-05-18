import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  computed,
  inject,
  output,
  signal,
} from '@angular/core';
import { LanguageService } from '../i18n/language.service';
import type { Lang } from '../i18n/translations';
import { ThemeService, type ThemeMode } from '../theme/theme.service';

const EXIT_DURATION_MS = 900;

@Component({
  selector: 'app-welcome-screen',
  standalone: true,
  templateUrl: './welcome-screen.html',
  styleUrl: './welcome-screen.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.welcome--exiting]': 'exiting()',
    '[attr.aria-hidden]': 'exiting() ? "true" : null',
    role: 'dialog',
    'aria-modal': 'true',
  },
})
export class WelcomeScreenComponent {
  protected readonly i18n = inject(LanguageService);
  protected readonly theme = inject(ThemeService);

  protected readonly exiting = signal(false);
  protected readonly selectedTheme = computed<ThemeMode>(() => this.theme.mode());
  protected readonly selectedLang = computed<Lang>(() => this.i18n.lang());

  readonly entered = output<void>();

  protected pickTheme(mode: ThemeMode): void {
    if (this.exiting()) return;
    this.theme.setMode(mode);
  }

  protected pickLang(lang: Lang): void {
    if (this.exiting()) return;
    this.i18n.setLang(lang);
  }

  protected enter(): void {
    if (this.exiting()) return;
    this.exiting.set(true);
    window.setTimeout(() => this.entered.emit(), EXIT_DURATION_MS);
  }

  @HostListener('document:keydown.enter', ['$event'])
  protected onEnterKey(event: Event): void {
    const target = event.target as HTMLElement | null;
    if (target && target.tagName === 'BUTTON') return;
    this.enter();
  }
}
