import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs"
import {AngularFireAuth} from "@angular/fire/auth"
import { AngularFireDatabase } from "@angular/fire/database"


import { AuthService } from '../../services/auth.service';
import { ChatService } from "../../services/chat.service"

import { ChatMessage } from "../../models/chat-message.model"

import * as firebase from "firebase/app"



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  user: Observable<firebase.User>;
  userN: firebase.User;
  userEmail: string;
  userName: string;

  constructor(private authService: AuthService, 
    private db: AngularFireDatabase, 
    private afAuth: AngularFireAuth) {
      this.afAuth.authState.subscribe(auth => {
        if (auth !== undefined && auth !== null) {
          this.userN = auth;
        }
  
        this.getUser().subscribe(a => {
          this.userName = a.displayName;
        });
      });
    }

  ngOnInit() {
    this.user = this.authService.authUser();
    this.user.subscribe(user => { 
      if (user) {
        this.userEmail = user.email;
      }
    });
  }

  getUser(): Observable<any> {
    const userId = this.userN.uid;
    const path = `/users/${userId}`;
    return this.db.object(path).valueChanges();
  }

  logout() {
    this.authService.logout();
  }
}
