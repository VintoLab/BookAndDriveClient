import { Component, inject, OnInit } from '@angular/core';
import { MatChipSelectionChange, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CarType } from '../../../core/enums/car-type.enum';
import { CarTransmission } from '../../../core/enums/car-transmission.enum';
import { GetCarsQueryParams } from '../../../core/models/get-cars-query-params.model';
import { CommonModule } from '@angular/common';
import { Car } from '../../admin/models/car/car.model';
import { CarsService } from '../../../shared/services/cars.service';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [
    MatChipsModule,
    MatIconModule,
    CommonModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.scss'
})
export class CarListComponent implements OnInit {
  carsService = inject(CarsService);
  
  carType = CarType;
  carTransmission = CarTransmission;

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

  private refetchData() {
    this.carsService.getCars(this.queryParams).subscribe({
      next: (data) => this.cars = data,
      error: (error) => console.log(error.error)
    });
  }
}

