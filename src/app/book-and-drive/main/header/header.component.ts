import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { Router, RouterModule } from '@angular/router';
import { JwtService } from '../../../core/services/jwt.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
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
