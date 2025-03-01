import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { JwtService } from '../../core/services/jwt.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    RouterLink
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  localStorageService = inject(LocalStorageService);
  jwtService = inject(JwtService);
  router = inject(Router);

  token: string | null;

  constructor() {
    this.token = this.localStorageService.getToken();
  }

  logout() {
    this.localStorageService.clear();
    this.token = null;
    this.router.navigate(['']);
  }
}
