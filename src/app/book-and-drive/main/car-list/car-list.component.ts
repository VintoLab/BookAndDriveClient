import { Component, inject, OnInit } from '@angular/core';
import { MatChipSelectionChange, MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CarType } from '../../../core/enums/car-type.enum';
import { CarTransmission } from '../../../core/enums/car-transmission.enum';
import { GetCarsQueryParams } from '../../../core/models/car/get-cars-query-params.model';
import { CommonModule } from '@angular/common';
import { Car } from '../../../core/models/car/car.model';
import { CarsService } from '../../../core/services/cars.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [
    MatChipsModule,
    MatIconModule,
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.scss'
})
export class CarListComponent implements OnInit {
  carsService = inject(CarsService);
  router = inject(Router);

  carType = CarType;
  carTransmission = CarTransmission;

  isLoading = false;
  queryParams: GetCarsQueryParams = {
    status: 1,
    transmission: '',
    type: ''
  }

  cars: Car[] = [];

  ngOnInit(): void {
    this.refetchData();
  }

  onCarTransmissionChange($event: MatChipSelectionChange) {
    if ($event.selected) {
      this.queryParams.transmission = $event.source.value;
      this.refetchData();
    } else {
      this.queryParams.transmission = '';
      this.refetchData();
    }
  }

  onCarTypeChange($event: MatChipSelectionChange) {
    if ($event.selected) {
      this.queryParams.type = $event.source.value;
      this.refetchData();
    } else {
      this.queryParams.type = '';
      this.refetchData();
    }
  }

  navigateToOrderCreation(chosenCar: Car) {
    this.router.navigate(['/order-creation'], { state: { data: chosenCar } });
  }

  private refetchData() {
    this.isLoading = true;
    this.carsService.getCars(this.queryParams).subscribe({
      next: (data) => {
        this.cars = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error.error);
        this.isLoading = false;
      }
    });
  }
}

