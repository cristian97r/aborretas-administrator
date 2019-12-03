import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { AborretaService } from "src/app/services/aborreta.service";

@Component({
  selector: "app-signup-form",
  templateUrl: "./signup-form.component.html",
  styleUrls: ["./signup-form.component.scss"]
})
export class SignupFormComponent implements OnInit {
  email: string;
  password: string;
  displayName: string;
  address: string;
  name: string;
  role: string;
  errorMsg: string;
  lat: number;
  lng: number;
  locationChosen = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private aborreta: AborretaService
  ) {}

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

  signUp() {
    const email = this.email;
    const password = this.password;
    const displayName = this.displayName;
    const storeData = {
      address: this.address,
      name: this.name,
      lat: this.lat,
      lng: this.lng
    };
    const createUserWithStore = async () => {
      const storeId = await this.aborreta.createStore(storeData);
      this.authService
        .signUp(email, password, displayName, storeId)
        .then(resolve => this.router.navigate(["comunicacion"]))
        .catch(error => (this.errorMsg = error.message));
    };
    if (this.role == "store") {
      createUserWithStore();
    } else {
      const storeId = "";
      this.authService
        .signUp(email, password, displayName, storeId)
        .then(resolve => this.router.navigate(["comunicacion"]))
        .catch(error => (this.errorMsg = error.message));
    }
  }

  ngOnInit() {
    this.getUserLocation();
  }
}
