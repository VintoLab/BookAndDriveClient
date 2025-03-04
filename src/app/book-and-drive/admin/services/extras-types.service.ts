import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ExtrasType } from "../models/extras-type.model";
import { ExtrasTypeDTO } from "../models/extras-type.dto";

@Injectable({
  providedIn: "root"
})
export class ExtrasTypesService {

  private readonly http = inject(HttpClient);
  private readonly url = environment.apiBaseUrl;

  getExtrasTypes(): Observable<ExtrasType[]> {
    return this.http.get<ExtrasType[]>(`${this.url}/extrastypes`)
  }

  create(extrasType: ExtrasTypeDTO) {
    return this.http.post(`${this.url}/extrastypes`, extrasType);
  }

  update(id: number, extrasType: ExtrasTypeDTO) {
    return this.http.put(`${this.url}/extrastypes/${id}`, extrasType);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/extrastypes/${id}`)
  }
}