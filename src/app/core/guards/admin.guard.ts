import { inject } from "@angular/core"
import { Router } from "@angular/router"
import { LocalStorageService } from "../services/local-storage.service";
import { JwtService } from "../services/jwt.service";
import { UserRole } from "../enums/user-role.enum";

export const adminGuard = () => {
  const localStorageService = inject(LocalStorageService);
  const jwtService = inject(JwtService);
  const router = inject(Router);

  const token = localStorageService.getToken();
  const payload = jwtService.getPayload(token!);

  if (payload.role === UserRole.Admin) {
    return true;
  }

  router.navigate(['']);
  return false;
}