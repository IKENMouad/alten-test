import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { AccountComponent } from "./account/account.component";

export const AUTH_ROUTES: Routes = [
	{
		path: "account",
		component: AccountComponent,
	},
	{
		path: "login",
		component: LoginComponent,
	},
	{ path: "**", redirectTo: "account" },
];
