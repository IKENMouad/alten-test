import {
  Component,
  inject,
} from "@angular/core";
import { RouterModule } from "@angular/router";
import { SplitterModule } from 'primeng/splitter';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelMenuComponent } from "./shared/ui/panel-menu/panel-menu.component";
import { Store } from "@ngrx/store";
import { AsyncPipe } from "@angular/common";
import { selectCart, } from "./store/cart.selectors";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterModule, SplitterModule, ToolbarModule, TagModule, PanelMenuComponent, AsyncPipe],
})
export class AppComponent {
  title = "ALTEN SHOP";

  store = inject(Store)
  products = [];

  ngOnInit(): void {
    this.store.select(selectCart).subscribe((val: any) => this.products = val);
  }
}
