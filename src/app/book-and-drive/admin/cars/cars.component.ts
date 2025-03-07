import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { CarType } from '../../../core/enums/car-type.enum';
import { CarStatus } from '../../../core/enums/car-status.enum';
import { CarTransmission } from '../../../core/enums/car-transmission.enum';
import { GetCarsQueryParams } from '../../../core/models/get-cars-query-params.model';
import { CarsService } from '../services/cars.service';
import { Observable } from 'rxjs';
import { Car } from '../models/car/car.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTableModule,
  ],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.scss'
})
export class CarsComponent implements OnInit {
  carsService = inject(CarsService);

  CarTransmission = CarTransmission;
  carType = CarType;
  carStatus = CarStatus;

  queryParams: GetCarsQueryParams = {
    transmission: '',
    type: '',
    status: '',
  };

  displayedColumns: string[] = [
    'position', 'image', 'brand', 'year', 'type', 'seats', 'transmission', 'vin', 'price', 'status', 'actions'
  ];
  cars$: Observable<Car[]> = new Observable();

  ngOnInit() {
    this.cars$ = this.carsService.getCars(this.queryParams);
  }

  onCarTransmissionChange(value: CarTransmission) {
    this.queryParams.transmission = value;
    this.cars$ = this.carsService.getCars(this.queryParams);
  }

  onCarTypeChange(value: CarType) {
    this.queryParams.type = value;
    this.cars$ = this.carsService.getCars(this.queryParams);
  }

  onCarStatusChange(value: CarStatus) {
    this.queryParams.status = value;
    this.cars$ = this.carsService.getCars(this.queryParams);
  }

  onAdd() {
    console.log('onAdd fired');
  }

  onEdit(car: Car) {
    console.log('onEdit fired', car);
  }

  onDelete(id: number) {
    console.log('onDelete fired', id);
  }
}
