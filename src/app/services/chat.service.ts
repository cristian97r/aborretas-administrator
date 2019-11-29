import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database"
import {AngularFireAuth} from "@angular/fire/auth"
import { Observable } from "rxjs"
import { AuthService } from "../services/auth.service"
import * as firebase from "firebase/app"

import { ChatMessage } from "../models/chat-message.model"


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  user: firebase.User;
  chatMessages: AngularFireList<ChatMessage>;
  chatMessage: ChatMessage;
  userName: string;

  constructor( private db: AngularFireDatabase, private afAuth: AngularFireAuth ) { 
    
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }

      this.getUser().subscribe(a => {
        this.userName = a.displayName;
      });
    });
}


getUser(): Observable<any> {
  const userId = this.user.uid;
  const path = `/users/${userId}`;
  return this.db.object(path).valueChanges();
}

getUsers(): Observable<any> {
  const path = `/users`;
  return this.db.list(path).valueChanges();
}



  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    const email = this.user.email;
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message: msg,
      timeSent: timestamp,
      userName: this.userName,
      email: email
    });
  }

  getMessages(): AngularFireList<ChatMessage> {
    return this.db.list('messages',  ref => ref.orderByKey().limitToLast(25));
  }

  getMessagesForFeed(): Observable<ChatMessage[]> {
    return this.db.list<ChatMessage>('messages', ref => ref.orderByKey().limitToLast(25)).valueChanges();
  }

  getTimeStamp() {
   const now = new Date()
   const date = now.getUTCFullYear() + "/" +
                (now.getUTCMonth() + 1) + "/" +
                now.getUTCDate()
   const time = now.getUTCHours() + ":" +
                (now.getUTCMinutes() + 1) + ":" +
                now.getUTCSeconds()

    return (date + " " + time)
  }
}
