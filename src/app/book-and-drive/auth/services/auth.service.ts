import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { RegisterModel } from "../models/register.model";
import { LoginModel } from "../models/login.model";
import { LoginResponse } from "../models/login-response.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly url = environment.apiBaseUrl;

  register(data: RegisterModel) {
    return this.http.post(`${this.url}/account/register`, data)
  }

  login(data: LoginModel): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}/account/login`, data)
  }
}