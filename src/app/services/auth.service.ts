import { Injectable } from '@angular/core';
import { Router } from "@angular/router"
import { AngularFireDatabase } from "@angular/fire/database"
import { AngularFireAuth } from "@angular/fire/auth"
import * as firebase from "firebase/app"
import { Observable } from "rxjs/"
import { User } from "../models/user.model"


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: Observable<firebase.User>
  private authState: any
  userDisplay: string


  constructor(private afAuth: AngularFireAuth, 
    private db: AngularFireDatabase, 
    private router: Router) {
      this.user = afAuth.authState;
    }

    authUser(){
      return this.user
    }

    getDisplayName () {
      return this.userDisplay
    }

    get currentUserId(): string {
      return this.authState !== null ? this.authState.user.uid : ""
    }

    login(email: string, password: string) {
      return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
          this.authState = user;
          this.setUserStatus('online');
          this.router.navigate(['comunicacion']);
        });
    }

    logout() {
      this.afAuth.auth.signOut();
      this.router.navigate(['login']);
    }

    signUp(email: string, password: string, displayName: string) {
      return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
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

      this.db.object(path).update(data)
        .catch(error => console.log(error));
    }
    setUserStatus(status: string): void {
      const path = `users/${this.currentUserId}`;
      const data = {
        status: status
      };
    }
}
