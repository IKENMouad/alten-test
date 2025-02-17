import { AsyncPipe } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink, RouterModule } from "@angular/router";
import { PanelMenuComponent } from "app/shared/ui/panel-menu/panel-menu.component";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { SplitterModule } from "primeng/splitter";
import { TagModule } from "primeng/tag";
import { ToolbarModule } from "primeng/toolbar";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  standalone: true,
    imports: [RouterModule, SplitterModule, ToolbarModule, TagModule, PanelMenuComponent, AsyncPipe,CardModule, RouterLink, ButtonModule],
  
})
export class HomeComponent {
  public readonly appTitle = "ALTEN SHOP"
}
