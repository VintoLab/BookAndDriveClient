import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from '../../admin/models/car/car.model';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { RentalDateComponent } from "./rental-date/rental-date.component";

@Component({
  selector: 'app-order-creation',
  standalone: true,
  imports: [
    MatButtonModule,
    MatExpansionModule,
    RentalDateComponent
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