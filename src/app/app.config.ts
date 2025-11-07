import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideHttpClient} from '@angular/common/http';
import {provideTranslateService} from '@ngx-translate/core';
import {provideTranslateHttpLoader} from '@ngx-translate/http-loader';
import {Constants} from './constants/Constants';


const INITIAL_LANG = getInitialLang();

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    provideTranslateService({
      lang: INITIAL_LANG,
      fallbackLang: 'en',
      loader: provideTranslateHttpLoader({
        prefix: 'assets/i18n/',
        suffix: '.json'
      })
    }),
  ]
};

function getInitialLang(): string {
  const saved = localStorage.getItem(Constants.LANGUAGE_KEY);
  if (saved) return saved;
  const nav = typeof navigator !== 'undefined' ? navigator.language?.toLowerCase() : 'en';
  return nav?.startsWith('de') ? 'de' : 'en';
}
