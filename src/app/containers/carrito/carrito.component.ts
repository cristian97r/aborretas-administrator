import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { StoresService } from "../../services/stores.service";
import { Observable } from "rxjs";

import { User } from "../../models/user.model";
import * as moment from "moment";
moment.locale("es");

@Component({
  selector: "app-carrito",
  templateUrl: "./carrito.component.html",
  styleUrls: ["./carrito.component.scss"]
})
export class CarritoComponent implements OnInit {
  user: Observable<User>;
  storeId: string;
  products: Array<object>;
  carrito: Array<object>;
  productsList = [];
  Total = 0.0;

  constructor(private authService: AuthService, private store: StoresService) {}

  onProductClick(productId) {
    this.store.getProduct(productId, this.storeId).then(product => {
      const newProduct = {
        id: Math.random(),
        nombre: product.nombre,
        precio: product.precio
      };
      this.productsList.push(newProduct);
      this.getTotalPrice();
    });
  }

  deleteFromTheList(id) {
    console.log(id);
    const product = (this.productsList = this.productsList.filter(item => {
      return item.id != id;
    }));
    this.productsList = product;
    this.getTotalPrice();
  }

  getTotalPrice() {
    this.productsList.forEach(product => {
      this.Total += product.precio;
    });
  }

  onCheckout() {
    const data = {
      total: this.Total,
      products: this.productsList,
      storeId: this.storeId,
      moment: moment()
        .locale("es")
        .toLocaleString()
    };
    this.store.checkout(data);
    this.Total = 0;
    this.productsList = [];
  }

  ngOnInit() {
    this.user = this.authService.authUser();
    this.user.subscribe(user => {
      if (user) {
        this.storeId = user.storeId;
        const path = `stores/${this.storeId}/productos`;
        this.products = this.store.getProducts(path);
      }
    });
  }
}
