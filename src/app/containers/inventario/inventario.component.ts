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
  products: Array<object>;

  constructor(private authService: AuthService, private store: StoresService) {}

  ngOnInit() {
    this.user = this.authService.authUser();
    this.user.subscribe(user => {
      if (user) {
        this.storeId = user.storeId;
        const path = `stores/${this.storeId}/productos`;
        this.setProducts(path);
      }
    });
  }

  onClickGuardar() {
    const path = `stores/${this.storeId}/productos`;
    const data = {
      nombre: this.nombre,
      precio: parseInt(this.precio)
    };
    this.store.addProduct(data, path);
    this.setProducts(path);
  }

  setProducts(path) {
    this.store.getProducts(path).subscribe(products => {
      let productos = [];
      products.forEach(product => {
        const ref = product.data();
        const producto = {
          id: product.id,
          precio: ref.precio,
          nombre: ref.nombre
        };
        productos.push(producto);
      });
      this.products = productos;
    });
  }
}
