import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { AuthService } from "../../services/auth.service";

import { User } from "../../models/user.model";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"]
})
export class NavBarComponent implements OnInit {
  user: Observable<User>;
  userEmail: string;
  userName: string;
  storeId: string;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.authUser();
    this.user.subscribe(user => {
      if (user) {
        this.userEmail = user.email;
        this.userName = user.displayName;
        this.storeId = user.storeId;
      } else {
        this.userName = "";
      }
    });
  }

  signOut() {
    this.authService.logout();
  }
}
