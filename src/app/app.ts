import {Component, computed, effect, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { ThemeService } from './service/theme.service';

import {LanguageService} from './service/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule, MatIconModule, MatButtonModule,
    MatFormFieldModule, MatSelectModule,
    FormsModule,
    TranslateModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly theme = inject(ThemeService);
  readonly lang = inject(LanguageService);
  readonly themeIcon = computed(() => this.theme.theme() === 'dark' ? 'light_mode' : 'dark_mode');
}
