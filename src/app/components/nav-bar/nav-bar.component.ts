import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from "rxjs"
import { AngularFireAuth } from "@angular/fire/auth"
import { AngularFireDatabase } from "@angular/fire/database"


import { AuthService } from '../../services/auth.service';
import { ChatService } from "../../services/chat.service"

import { ChatMessage } from "../../models/chat-message.model"
import { User } from "../../models/user.model"

import * as firebase from "firebase/app"



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  user: Observable<User>;
  userEmail: string;
  userName: string;

  constructor(private authService: AuthService,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private router: Router,
    public auth: AuthService) {
  }

  ngOnInit() {
    this.user = this.authService.authUser();
    this.user.subscribe(user => {
      if (user) {
        this.userEmail = user.email;
        this.userName = user.displayName
      } else {
        this.userName = ""
      }
    });


  }

  signOut() {
    this.authService.logout()
  }
}