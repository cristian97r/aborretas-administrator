import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import * as firebase from "firebase/app";
import { auth } from "firebase/app";
import { GeocoderLocationType } from "@agm/core";

export interface Store {
  address?: string;
  lat?: number;
  lng?: number;
  name?: string;
  products: Product;
}
export interface Product {
  name?: string;
  price?: number;
}

@Injectable({
  providedIn: "root"
})
export class AborretaService {
  userId: string;
  public storeId: string;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      user ? (this.userId = user.uid) : null;
    });
  }

  public async createStore(data) {
    const store = await this.afs.collection("stores").add(data);
    return store.id;
  }
}
