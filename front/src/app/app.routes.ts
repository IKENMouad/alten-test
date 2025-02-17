import { Routes } from "@angular/router";
import { HomeComponent } from "./shared/features/home/home.component";
import { ContactComponent } from "./contact/contact.component";
import { CartComponent } from "./cart/cart.component";
import { authGuard } from "./guards";

export const APP_ROUTES: Routes = [
  {
    path: "home",
    component: HomeComponent, 
  },
  {
    path: "products",
    loadChildren: () =>
      import("./products/products.routes").then((m) => m.PRODUCTS_ROUTES),
    canActivate: [authGuard],
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./auth/auth.routes").then((m) => m.AUTH_ROUTES),
  },
  {
    path: "contact",
    component: ContactComponent,
    canActivate: [authGuard],
  },
  {
    path: "cart",
    component: CartComponent,
    canActivate: [authGuard],
  },
  { path: "", redirectTo: "home", pathMatch: "full" },
];
