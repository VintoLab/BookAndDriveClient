import { Routes } from "@angular/router";
import { CarsComponent } from "./cars/cars.component";
import { OrdersComponent } from "./orders/orders.component";
import { UsersComponent } from "./users/users.component";
import { ExtrasComponent } from "./extras/extras.component";

export const ADMIN_ROUTES: Routes = [
  { path: 'cars', component: CarsComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'users', component: UsersComponent },
  { path: 'extras', component: ExtrasComponent }
]