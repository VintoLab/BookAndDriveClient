import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from '../../admin/models/car/car.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-creation',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './order-creation.component.html',
  styleUrl: './order-creation.component.scss'
})
export class OrderCreationComponent {
  router = inject(Router);

  step = 0;
  chosenCar: Car;

  constructor() {
    const navigation = this.router.getCurrentNavigation();
    this.chosenCar = navigation?.extras.state?.['data'];
  }

  setStep(index: number) {
    this.step = index
  }

  nextStep() {
    this.step += 1;
  }

  prevStep() {
    this.step -= 1;
  }
}