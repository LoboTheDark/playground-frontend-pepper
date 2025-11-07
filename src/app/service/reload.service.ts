import { Injectable, NgZone, signal } from '@angular/core';
import {Constants} from '../constants/Constants';


@Injectable({ providedIn: 'root' })
export class ReloadService {
  private readonly _reloadTick = signal(0);
  readonly reloadTick = this._reloadTick.asReadonly();

  private readonly _languageChangedTick = signal(0);
  readonly languageChangedTick = this._languageChangedTick.asReadonly();

  constructor(zone: NgZone) {
    zone.runOutsideAngular(() => {
      globalThis.addEventListener('storage', (e: StorageEvent) => {
        this.informListeners(e, zone);
      });
    });
  }


  private informListeners(e: StorageEvent, zone: NgZone) {
    if (e.key === Constants.LANGUAGE_KEY) {
      zone.run(() => this._languageChangedTick.update(v => v + 1));
    }
  }

  bumpLanguageChanged(): void {
    this._reloadTick.update(v => v + 1);
    localStorage.setItem(Constants.RELOAD_ALL_LANG_LISTENER_KEY, String(Date.now()));
  }
}
