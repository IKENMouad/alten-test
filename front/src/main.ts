import { enableProdMode, importProvidersFrom, isDevMode, provideZoneChangeDetection } from "@angular/core";
import { registerLocaleData } from "@angular/common";
import { provideHttpClient, withInterceptors, withInterceptorsFromDi, } from "@angular/common/http";
import localeFr from "@angular/common/locales/fr";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { ConfirmationService, MessageService } from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";
import { AppComponent } from "./app/app.component";
import { environment } from "./environments/environment";
import { APP_ROUTES } from "app/app.routes";
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { cartReducer, } from "app/store/cart/cart.reducer";
import { authReducer } from "app/store/auth/auth.reducer";
import { authInterceptor } from "app/interceptors/auth.interceptor";
 
if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    provideHttpClient(  withInterceptors ([authInterceptor])  ),
    provideAnimations(),
    provideRouter(APP_ROUTES),
    ConfirmationService,
    MessageService,
    DialogService,

    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideStore({
      cart: cartReducer,
      auth: authReducer
    }),
    provideEffects([])

  ],
}).catch((err) => console.log(err));

registerLocaleData(localeFr, "fr-FR");
