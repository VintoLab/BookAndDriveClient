import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Car } from "../models/car/car.model";
import { GetCarsQueryParams } from "../../../core/models/get-cars-query-params.model";

@Injectable({
  providedIn: "root"
})
export class CarsService {
  private readonly http = inject(HttpClient);
  private readonly url = environment.apiBaseUrl

  getCars(params: GetCarsQueryParams): Observable<Car[]> {
    const httpParams = new HttpParams()
      .set('carStatus', params.status.toString())
      .set('carType', params.type.toString())
      .set('transmission', params.transmission);

    return this.http.get<Car[]>(`${this.url}/car`, { params: httpParams });
  }
}