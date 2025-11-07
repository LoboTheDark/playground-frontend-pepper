import { Injectable, effect, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { OverlayContainer } from '@angular/cdk/overlay';
import {Constants} from '../constants/Constants';

type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  private readonly overlay = inject(OverlayContainer);
  readonly theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    effect(() => {
      const isDark = this.theme() === 'dark';
      const body = this.doc.body;
      const overlayEl = this.overlay.getContainerElement();

      body.classList.toggle('dark', isDark);
      overlayEl.classList.toggle('dark', isDark);

      try { localStorage.setItem(Constants.THEME_KEY, this.theme()); } catch {}
    });

    try {
      const mm = globalThis.matchMedia('(prefers-color-scheme: dark)');
      mm.addEventListener('change', e => {
        const stored = localStorage.getItem(Constants.THEME_KEY) as Theme | null;
        if (!stored) this.setTheme(e.matches ? 'dark' : 'light');
      });
    } catch {}
  }

  toggle() { this.setTheme(this.theme() === 'dark' ? 'light' : 'dark'); }
  setTheme(t: Theme) { this.theme.set(t); }

  private getInitialTheme(): Theme {
    try {
      const stored = localStorage.getItem(Constants.THEME_KEY) as Theme | null;
      if (stored === 'dark' || stored === 'light') return stored;
    } catch {}
    try {
      return globalThis.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {}
    return 'light';
  }
}
