import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CarListComponent } from "./car-list/car-list.component";
import { OrderCreationComponent } from "./order-creation/order-creation.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { NoPageComponent } from "../../shared/components/no-page/no-page.component";

export const MAIN_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'car-list', component: CarListComponent },
  { path: 'order-creation', component: OrderCreationComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: '**', component: NoPageComponent }
]