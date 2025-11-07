import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import packageJson from '../package.json';

if (packageJson.version) {
  console.log(`🌟 Frontend version: ${packageJson.version}`);
}

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
