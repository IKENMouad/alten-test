import { enableProdMode, importProvidersFrom, isDevMode, provideZoneChangeDetection } from "@angular/core";

import { registerLocaleData } from "@angular/common";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import localeFr from "@angular/common/locales/fr";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { APP_ROUTES } from "app/app.routes";
import { ConfirmationService, MessageService } from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";
import { AppComponent } from "./app/app.component";
import { environment } from "./environments/environment";
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { cartReducer, } from "app/store/cart.reducer";
import { CartEffects } from "app/store/cart.effects";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideRouter(APP_ROUTES),
    ConfirmationService,
    MessageService,
    DialogService,

    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideStore({
      cart: cartReducer
    }),
    provideEffects([CartEffects])

  ],
}).catch((err) => console.log(err));

registerLocaleData(localeFr, "fr-FR");
