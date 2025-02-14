import { Routes } from "@angular/router";
import { HomeComponent } from "./shared/features/home/home.component";
import { ContactComponent } from "./contact/contact.component";
import { CardComponent } from "./card/card.component";
import { LoginComponent } from "./auth/login/login.component";

export const APP_ROUTES: Routes = [
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "products",
    loadChildren: () =>
      import("./products/products.routes").then((m) => m.PRODUCTS_ROUTES)
  },
  {
    path: "contact",
    component: ContactComponent,
  },
  {
    path: "card",
    component: CardComponent,
  },
  {
    path: "account",
    component: CardComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  { path: "", redirectTo: "home", pathMatch: "full" },
];
