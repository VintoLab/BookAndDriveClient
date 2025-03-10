import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { CarType } from '../../../core/enums/car-type.enum';
import { CarTransmission } from '../../../core/enums/car-transmission.enum';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [
    MatChipsModule,
    MatIconModule
  ],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.scss'
})
export class CarListComponent {
  carType = CarType;
  carTransmission = CarTransmission;
}
