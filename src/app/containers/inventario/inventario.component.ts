import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { StoresService } from "../../services/stores.service";
import { User } from "../../models/user.model";

@Component({
  selector: "app-inventario",
  templateUrl: "./inventario.component.html",
  styleUrls: ["./inventario.component.scss"]
})
export class InventarioComponent implements OnInit {
  user: Observable<User>;
  nombre: string;
  precio: string;
  storeId: string;

  constructor(private authService: AuthService, private store: StoresService) {}

  ngOnInit() {
    this.user = this.authService.authUser();
    this.user.subscribe(user => {
      if (user) {
        this.storeId = user.storeId;
      }
    });
  }

  onClickGuardar() {
    const data = {
      nombre: this.nombre,
      precio: parseInt(this.precio)
    };
    this.store.addProduct(data, this.storeId).then(doc => console.log(doc));
  }
}
