import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { GetCarsQueryParams } from "../models/car/get-cars-query-params.model";
import { Car } from "../models/car/car.model";
import { CarDTO } from "../../book-and-drive/admin/models/car/car.dto";

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

  add(car: CarDTO) {
    const formData = new FormData();

    this.setFormData(car, formData);

    return this.http.post(`${this.url}/car`, formData);
  }

  update(id: number, car: CarDTO) {
    const formData = new FormData();

    this.setFormData(car, formData);

    return this.http.put(`${this.url}/car/${id}`, car);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/car/${id}`);
  }

  private setFormData(car: CarDTO, formData: FormData) {
    formData.append('brand', car.brand);
    formData.append('year', car.year.toString());
    formData.append('seats', car.seats.toString());
    formData.append('vin', car.vin);
    formData.append('transmission', car.transmission);
    formData.append('carTypeId', car.type.toString());
    formData.append('carStatusId', car.status.toString());
    formData.append('price', car.price.toString());

    if (car.photo) {
      formData.append('photo', car.photo, car.photo.name);
    }
  }
}