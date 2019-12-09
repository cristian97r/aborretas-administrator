import { Component, OnInit } from "@angular/core";
import { StoresService } from "../../services/stores.service";
import * as moment from "moment";

@Component({
  selector: "app-ventas",
  templateUrl: "./ventas.component.html",
  styleUrls: ["./ventas.component.scss"]
})
export class VentasComponent implements OnInit {
  sells: Array<object>;
  constructor(private store: StoresService) {}

  show() {
    console.log(this.sells);
  }

  ngOnInit() {
    const sells: Array<Object> = this.store.getSells();
    this.sells = sells;
    console.log(this.sells);
  }
}
