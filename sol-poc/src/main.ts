import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { bob7, bob8 } from 'bob';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
