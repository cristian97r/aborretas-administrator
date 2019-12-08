import { Component, OnInit } from "@angular/core";
import { StoresService } from "../../services/stores.service";

@Component({
  selector: "app-tiendas",
  templateUrl: "./tiendas.component.html",
  styleUrls: ["./tiendas.component.scss"]
})
export class TiendasComponent implements OnInit {
  stores: Array<Object>;

  constructor(private store: StoresService) {}

  ngOnInit() {
    this.stores = this.store.getStores();
  }
}
