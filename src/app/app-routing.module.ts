import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InicioComponent } from "./containers/inicio/inicio.component";
import { TiendasComponent } from "./containers/tiendas/tiendas.component";
import { ComunicacionComponent } from './containers/comunicacion/comunicacion.component';
import { LoginFormComponent } from "./components/login-form/login-form.component"
import { SignupFormComponent } from "./components/signup-form/signup-form.component"

const routes: Routes = [
  { path: "inicio", component: InicioComponent },
  { path: "tiendas", component: TiendasComponent },
  { path: "comunicacion", component: ComunicacionComponent },
  { path: "login", component: LoginFormComponent },
  { path: "signup", component: SignupFormComponent },
  { path: "", redirectTo: "login", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
