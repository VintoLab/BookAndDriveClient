import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LocalStorageService {
  private readonly TOKEN = 'token';

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN, token);
  }

  clear(): void {
    localStorage.clear();
  }
}