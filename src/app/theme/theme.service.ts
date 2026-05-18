import { Injectable, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'cv-theme';

function detectInitialTheme(): ThemeMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  } catch {
    // localStorage may be unavailable — fall through.
  }
  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _mode = signal<ThemeMode>(detectInitialTheme());

  readonly mode = this._mode.asReadonly();

  constructor() {
    this.syncDocument(this._mode());
  }

  setMode(mode: ThemeMode): void {
    if (this._mode() === mode) {
      return;
    }
    this._mode.set(mode);
    this.syncDocument(mode);
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // Ignore storage failures.
    }
  }

  toggle(): void {
    this.setMode(this._mode() === 'dark' ? 'light' : 'dark');
  }

  private syncDocument(mode: ThemeMode): void {
    if (typeof document !== 'undefined') {
      document.documentElement.dataset['theme'] = mode;
    }
  }
}
