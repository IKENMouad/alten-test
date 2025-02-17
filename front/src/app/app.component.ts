import {
  Component,
  inject,
} from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { SplitterModule } from 'primeng/splitter';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelMenuComponent } from "./shared/ui/panel-menu/panel-menu.component";
import { Store } from "@ngrx/store";
import { AsyncPipe, CommonModule } from "@angular/common";
import { selectCart, } from "./store/cart/cart.selectors";
import { selectIsLoggedIn } from "./store/auth/auth.selectors";
import { LogoutAction } from "./store/auth/auth.actions";
import { ButtonModule } from "primeng/button";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterModule, SplitterModule, ToolbarModule, TagModule, PanelMenuComponent, AsyncPipe, CommonModule, ButtonModule],
})
export class AppComponent {
  title = "ALTEN SHOP";

  store = inject(Store)
  router = inject(Router);
  products = [];
  isAuth = false;

  ngOnInit(): void {
    this.store.select(selectCart).subscribe((val: any) => this.products = val);
    this.store.select(selectIsLoggedIn).subscribe((val: any) => this.isAuth = val);
  }

  public logout() {
    this.store.dispatch(LogoutAction());
    this.router.navigate(['/auth/login'])
  }
}
