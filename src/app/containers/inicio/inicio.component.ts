import { Component, OnInit } from "@angular/core";
import { StoresService } from "../../services/stores.service";

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.component.html",
  styleUrls: ["./inicio.component.scss"]
})
export class InicioComponent implements OnInit {
  lat: number;
  lng: number;
  stores: Array<Object>;
  locationChosen = false;
  constructor(private store: StoresService) {}

  onMapClick(coords) {
    this.lat = coords.coords.lat;
    this.lng = coords.coords.lng;
    this.locationChosen = true;
  }

  private getUserLocation() {
    /// locate the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }

  ngOnInit() {
    this.stores = this.store.getStores();
    this.getUserLocation();
  }
}
