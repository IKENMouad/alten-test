import { Routes } from "@angular/router";
import { CartComponent } from "app/cart/cart.component";
import { LoginComponent } from "./login/login.component";

export const AUTH_ROUTES: Routes = [
	{
		path: "account",
		component: CartComponent,
	},
	{
		path: "login",
		component: LoginComponent,
	},
	{ path: "**", redirectTo: "login" },
];
