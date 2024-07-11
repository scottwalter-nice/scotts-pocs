import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { bob7, bob8 } from 'bob';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
