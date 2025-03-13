import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Car } from '../../../admin/models/car/car.model';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MAX_BOOKING_DAYS } from '../../../../core/constants/constants';

@Component({
  selector: 'app-rental-date',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatTableModule,
    ReactiveFormsModule
  ],
  templateUrl: './rental-date.component.html',
  styleUrl: './rental-date.component.scss'
})
export class RentalDateComponent implements OnInit {
  fb = inject(FormBuilder);
  router = inject(Router);

  displayedColumns: string[] = [
    'image', 'brand', 'year', 'type', 'seats', 'transmission', 'price'
  ];

  minStartDate: Date | null = new Date(); // today
  maxEndDate: Date | null = null;

  numberOfDays = 0;
  totalPriceOfCar = 0;
  matTableDataSource: Car[] = [];

  dateRangeForm: FormGroup;

  @Input() car!: Car;

  constructor() {
    this.dateRangeForm = this.fb.group({
      start: [''],
      end: [''],
    });

    this.dateRangeForm.get('start')?.valueChanges.subscribe((selectedStartDate: Date) => {
      if (selectedStartDate) {
        this.minStartDate = selectedStartDate;
        this.maxEndDate = new Date(selectedStartDate);
        this.maxEndDate.setDate(this.maxEndDate.getDate() + MAX_BOOKING_DAYS);
      } else {
        this.minStartDate = null;
        this.maxEndDate = null;
      }
    });
  }

  ngOnInit() {
    this.totalPriceOfCar = this.car.price;
    this.matTableDataSource.push(this.car);
  }

  dateRangeChange() {
    const start: Date = this.dateRangeForm.controls['start'].value;
    const end: Date = this.dateRangeForm.controls['end'].value;

    this.numberOfDays = this.getDateDifferenceInDays(start, end);
    this.totalPriceOfCar = this.car.price * this.numberOfDays;
  }

  private getDateDifferenceInDays(start: Date, end: Date): number {
    const timeDiff = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }
}
