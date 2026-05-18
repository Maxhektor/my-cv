import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { LanguageService } from '../i18n/language.service';
import type { Lang } from '../i18n/translations';
import { ThemeService, type ThemeMode } from '../theme/theme.service';

@Component({
  selector: 'app-settings-menu',
  standalone: true,
  templateUrl: './settings-menu.html',
  styleUrl: './settings-menu.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsMenuComponent {
  protected readonly i18n = inject(LanguageService);
  protected readonly theme = inject(ThemeService);
  private readonly host = inject(ElementRef<HTMLElement>);

  protected readonly open = signal(false);

  protected toggle(): void {
    this.open.update((v) => !v);
  }

  protected close(): void {
    this.open.set(false);
  }

  protected selectLang(lang: Lang): void {
    this.i18n.setLang(lang);
  }

  protected selectTheme(mode: ThemeMode): void {
    this.theme.setMode(mode);
  }

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    if (!this.open()) {
      return;
    }
    const target = event.target as Node | null;
    if (target && !this.host.nativeElement.contains(target)) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.open()) {
      this.close();
    }
  }
}
