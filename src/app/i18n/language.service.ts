import { Injectable, computed, signal } from '@angular/core';
import { type Lang, SUPPORTED_LANGS, TRANSLATIONS, type Translation } from './translations';

const STORAGE_KEY = 'cv-lang';

function detectInitialLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && (SUPPORTED_LANGS as readonly string[]).includes(stored)) {
      return stored as Lang;
    }
  } catch {
    // localStorage may be unavailable (SSR, privacy mode) — fall through.
  }
  return 'en';
}

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly _lang = signal<Lang>(detectInitialLang());

  readonly lang = this._lang.asReadonly();
  readonly t = computed<Translation>(() => TRANSLATIONS[this._lang()]);
  readonly supported = SUPPORTED_LANGS;

  constructor() {
    this.syncDocumentLang(this._lang());
  }

  setLang(lang: Lang): void {
    if (this._lang() === lang) {
      return;
    }
    this._lang.set(lang);
    this.syncDocumentLang(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore storage failures.
    }
  }

  toggle(): void {
    this.setLang(this._lang() === 'en' ? 'da' : 'en');
  }

  private syncDocumentLang(lang: Lang): void {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }
}
