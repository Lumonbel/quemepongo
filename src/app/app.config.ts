import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';
import { PhotoService } from './services/photo.service';

export const appConfig: ApplicationConfig = {
  providers: [ provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    PhotoService,
    provideHttpClient(), provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura
            }
        })
  ]
};
