import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";

import { Observable, of } from "rxjs";
import { switchMap, first } from "rxjs/operators";

import * as firebase from "firebase";

@Injectable({ providedIn: "root" })
export class StoresService {
  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  getUser() {
    return this.user$.pipe(first()).toPromise();
  }

  SignIn(email, password) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  }

  private async oAuthLogin(provider) {
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  private updateUserData({ uid, email, displayName, photoURL }) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);

    const data = {
      uid,
      email,
      displayName,
      photoURL
    };

    return userRef.set(data, { merge: true });
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(["/"]);
  }

  public addProduct(data: object, path: string) {
    return this.afs.collection(path).add(data);
  }

  public getProducts(path) {
    let productos = [];
    this.afs
      .collection(path, ref => ref.orderBy("nombre", "asc"))
      .get()
      .subscribe(products => {
        products.forEach(product => {
          const ref = product.data();
          const producto = {
            id: product.id,
            precio: ref.precio,
            nombre: ref.nombre
          };
          productos.push(producto);
        });
      });
    return productos;
  }

  getStores() {
    let Stores = [];
    this.afs
      .collection("stores")
      .get()
      .subscribe(stores => {
        stores.forEach(store => {
          const ref = store.data();
          const Store = {
            id: store.id,
            ...ref
          };
          Stores.push(Store);
        });
      });
    return Stores;
  }

  getProduct(productId, storeId) {
    let Product: Object;
    const path = `stores/${storeId}/productos`;
    const producto = this.afs
      .collection(path)
      .doc(productId)
      .ref.get()
      .then(doc => {
        const ref = doc.data();
        const producto = {
          id: doc.id,
          nombre: ref.nombre,
          precio: ref.precio
        };
        return producto;
      });
    return producto;
  }

  checkout(data) {
    this.afs.collection("sells").add(data);
  }

  getTimeStamp() {
    const now = new Date();
    const date =
      now.getUTCFullYear() +
      "/" +
      (now.getUTCMonth() + 1) +
      "/" +
      now.getUTCDate();
    const time =
      now.getUTCHours() +
      ":" +
      (now.getUTCMinutes() + 1) +
      ":" +
      now.getUTCSeconds();

    return date + " " + time;
  }
}
