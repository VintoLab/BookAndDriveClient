import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CarType } from '../../../core/enums/car-type.enum';
import { CarStatus } from '../../../core/enums/car-status.enum';
import { CarTransmission } from '../../../core/enums/car-transmission.enum';
import { GetCarsQueryParams } from '../../../core/models/get-cars-query-params.model';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.scss'
})
export class CarsComponent implements OnInit {
  CarTransmission = CarTransmission;
  carType = CarType;
  carStatus = CarStatus;

  queryParams: GetCarsQueryParams = {
    transmission: '',
    type: '',
    status: '',
  }

  ngOnInit(): void {
    console.log(this.queryParams);
  }

  onCarTransmissionChange(value: CarTransmission) {
    this.queryParams.transmission = value;
    console.log('QueryParams', this.queryParams);
  }

  onCarTypeChange(value: CarType) {
    this.queryParams.type = value;
    console.log('QueryParams', this.queryParams);
  }

  onCarStatusChange(value: CarStatus) {
    this.queryParams.status = value;
    console.log('QueryParams', this.queryParams);
  }
}
