import { Injectable } from '@angular/core';
import { Router } from "@angular/router"
import { AngularFireDatabase } from "@angular/fire/database"
import { AngularFireAuth } from "@angular/fire/auth"
import * as firebase from "firebase/app"
import { auth } from "firebase/app"
import { Observable, of } from "rxjs/"
import { switchMap, first, shareReplay, tap } from "rxjs/operators"
import { User } from "../models/user.model"
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: Observable<User>;
  private authState: any
  userDisplay: string

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private afs: AngularFirestore,
    private router: Router) {
    this.user = afAuth.authState
      .pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }

  authUser() {
    return this.user
  }

  getDisplayName() {
    return this.userDisplay
  }
  
  getUser() {
    return this.user.pipe(first()).toPromise();
  }

  get currentUserId(): string {
    return this.authState !== null ? this.authState.user.uid : ""
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        this.setUserStatus('online');
        this.user
        this.router.navigate(['comunicacion']);
      });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
    this.setUserStatus("offline")
  }

  signUp(email: string, password: string, displayName: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        const status = 'online';
        this.setUserData(email, displayName, status);
        this.userDisplay = displayName;
      }).catch(error => console.log(error));
  }



  setUserData(email: string, displayName: string, status: string): void {
    const path = `users/${this.currentUserId}`;
    const data = {
      email: email,
      displayName: displayName,
      status: status
    };

    this.afs.doc(path).set(data)
      .catch(error => console.log(error + "hello from catch"));
  }
  setUserStatus(status: string) {
    const path = `users/${this.currentUserId}`;
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(path)
    const data = {
      status: status
    };
    return userRef.set(data, { merge: true })
  }
}
