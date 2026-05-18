import { Injectable, signal } from '@angular/core';

export type PresentationMode = 'minimal' | 'expressive';

const STORAGE_KEY = 'cv-presentation';

function detectInitialMode(): PresentationMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'minimal' || stored === 'expressive') {
      return stored;
    }
  } catch {
    // localStorage may be unavailable — fall through.
  }
  return 'minimal';
}

@Injectable({ providedIn: 'root' })
export class PresentationService {
  private readonly _mode = signal<PresentationMode>(detectInitialMode());

  readonly mode = this._mode.asReadonly();

  constructor() {
    this.syncDocument(this._mode());
  }

  setMode(mode: PresentationMode): void {
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

  private syncDocument(mode: PresentationMode): void {
    if (typeof document !== 'undefined') {
      document.documentElement.dataset['presentation'] = mode;
    }
  }
}
