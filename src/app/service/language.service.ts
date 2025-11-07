import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {Constants} from '../constants/Constants';

type Lang = 'de' | 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly translate = inject(TranslateService);
  readonly lang = signal<Lang>(this.getInitial());

  constructor() {
    this.translate.addLangs(['de', 'en']);
    this.translate.setFallbackLang('en');
    this.lang.set(this.getInitial());
    this.use(this.lang());
  }

  use(l: Lang) {
    this.lang.set(l);
    this.translate.use(l);
    try { localStorage.setItem(Constants.LANGUAGE_KEY, l); } catch {}
  }

  private getInitial(): Lang {
    try {
      const stored = localStorage.getItem(Constants.LANGUAGE_KEY) as Lang | null;
      if (stored === 'de' || stored === 'en') return stored;
    } catch {}
    const browser = (navigator.language || 'en').toLowerCase();
    return browser.startsWith('de') ? 'de' : 'en';
  }
}
