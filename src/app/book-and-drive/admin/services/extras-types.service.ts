import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ExtrasType } from "../models/extras-type.model";

@Injectable({
  providedIn: "root"
})
export class ExtrasTypesService {

  private readonly http = inject(HttpClient);
  private readonly url = environment.apiBaseUrl;

  getExtrasTypes(): Observable<ExtrasType[]> {
    return this.http.get<ExtrasType[]>(`${this.url}/extrastypes`)
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/extrastypes/${id}`)
  }
}