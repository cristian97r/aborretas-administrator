import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InicioComponent } from "./containers/inicio/inicio.component";
import { TiendasComponent } from "./containers/tiendas/tiendas.component";
import { ComunicacionComponent } from "./containers/comunicacion/comunicacion.component";
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { SignupFormComponent } from "./components/signup-form/signup-form.component";
import { CarritoComponent } from "./containers/carrito/carrito.component";
import { InventarioComponent } from "./containers/inventario/inventario.component";
import { AuthGuard } from "./auth.guard";
import { VentasComponent } from "./containers/ventas/ventas.component";

const routes: Routes = [
  { path: "inicio", component: InicioComponent, canActivate: [AuthGuard] },
  { path: "tiendas", component: TiendasComponent, canActivate: [AuthGuard] },
  {
    path: "comunicacion",
    component: ComunicacionComponent,
    canActivate: [AuthGuard]
  },
  { path: "carrito", component: CarritoComponent, canActivate: [AuthGuard] },
  {
    path: "inventario",
    component: InventarioComponent,
    canActivate: [AuthGuard]
  },
  { path: "ventas", component: VentasComponent },
  { path: "login", component: LoginFormComponent },
  { path: "signup", component: SignupFormComponent },
  { path: "", redirectTo: "login", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
