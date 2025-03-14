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
import { GetCarsQueryParams } from '../../../core/models/car/get-cars-query-params.model';
import { CarsService } from '../../../core/services/cars.service';
import { Observable } from 'rxjs';
import { Car } from '../../../core/models/car/car.model';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { NewCarComponent } from './new-car/new-car.component';

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
  dialog = inject(MatDialog);

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
    this.dialog.open(NewCarComponent, {
      height: '550px',
      width: '500px'
    }).afterClosed()
      .subscribe(res => {
        if (res.confirmed) {
          this.cars$ = this.carsService.getCars(this.queryParams);
        }
      });
  }

  onEdit(car: Car) {
    this.dialog.open(NewCarComponent, {
      data: car,
      height: '550px',
      width: '500px'
    }).afterClosed()
      .subscribe(res => {
        if (res.confirmed) {
          this.cars$ = this.carsService.getCars(this.queryParams);
        }
      });
  }

  onDelete(id: number) {
    this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this record?'
      }
    }).afterClosed()
      .subscribe(isConfirmed => {
        if (isConfirmed) {
          this.deleteCar(id);
        }
      })
  }

  private deleteCar(id: number) {
    this.carsService.delete(id).subscribe({
      next: () => {
        this.cars$ = this.carsService.getCars(this.queryParams);
      },
      error: (error) => console.log(error)
    });
  }
}
