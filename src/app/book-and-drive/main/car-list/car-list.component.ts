import { Component } from '@angular/core';
import { MatChipSelectionChange, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { CarType } from '../../../core/enums/car-type.enum';
import { CarTransmission } from '../../../core/enums/car-transmission.enum';
import { GetCarsQueryParams } from '../../../core/models/get-cars-query-params.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [
    MatChipsModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.scss'
})
export class CarListComponent {
  carType = CarType;
  carTransmission = CarTransmission;

  queryParams: GetCarsQueryParams = {
    status: 1,
    transmission: '',
    type: ''
  }

  onCarTransmissionChange($event: MatChipSelectionChange) {
    if ($event.selected) {
      this.queryParams.transmission = $event.source.value;
    } else {
      this.queryParams.transmission = '';
    }
  }

  onCarTypeChange($event: MatChipSelectionChange) {
    if ($event.selected) {
      this.queryParams.type = $event.source.value;
    } else {
      this.queryParams.type = '';
    }
  }
}

