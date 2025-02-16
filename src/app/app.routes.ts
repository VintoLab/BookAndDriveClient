import { Routes } from '@angular/router';
import { MainComponent } from './book-and-drive/main/main.component';
import { AdminComponent } from './book-and-drive/admin/admin.component';
import { NoPageComponent } from './shared/components/no-page/no-page.component';

export const routes: Routes = [
  { path: '', component: MainComponent, loadChildren: () => import('./book-and-drive/main/main.routes').then(mod => mod.MAIN_ROUTES)},
  { path: 'admin', component: AdminComponent, loadChildren: () => import('./book-and-drive/admin/admin.routes').then(mod => mod.ADMIN_ROUTES) },
  { path: 'auth', loadChildren: () => import('./book-and-drive/auth/auth.routes').then(mod => mod.AUTH_ROUTES) },
  { path: '**', component: NoPageComponent }
];
