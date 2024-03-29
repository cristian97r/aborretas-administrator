import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AgmCoreModule } from "@agm/core";
import { FormsModule } from "@angular/forms";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { MDBBootstrapModule } from "angular-bootstrap-md";

import { environment } from "../environments/environment";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { InicioComponent } from "./containers/inicio/inicio.component";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { TiendasComponent } from "./containers/tiendas/tiendas.component";
import { ChatFormComponent } from "./components/chat-form/chat-form.component";
import { ChatRoomComponent } from "./components/chat-room/chat-room.component";
import { FeedComponent } from "./components/feed/feed.component";
import { MessageComponent } from "./components/message/message.component";
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { SignupFormComponent } from "./components/signup-form/signup-form.component";
import { StoreListComponent } from "./components/store-list/store-list.component";
import { StoreItemComponent } from "./components/store-item/store-item.component";
import { ComunicacionComponent } from "./containers/comunicacion/comunicacion.component";

import { ChatService } from "./services/chat.service";
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./auth.guard";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { CarritoComponent } from "./containers/carrito/carrito.component";
import { InventarioComponent } from "./containers/inventario/inventario.component";
import { AddProductModalComponent } from "./components/add-product-modal/add-product-modal.component";
import { VentasComponent } from './containers/ventas/ventas.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NavBarComponent,
    TiendasComponent,
    ChatFormComponent,
    ChatRoomComponent,
    FeedComponent,
    MessageComponent,
    LoginFormComponent,
    SignupFormComponent,
    StoreListComponent,
    StoreItemComponent,
    ComunicacionComponent,
    CarritoComponent,
    InventarioComponent,
    AddProductModalComponent,
    VentasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDamcOI_cU5Ug9vu1eBAalmgK1tArosgmw"
    }),
    FormsModule,
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    MDBBootstrapModule.forRoot()
  ],
  providers: [AuthService, ChatService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
