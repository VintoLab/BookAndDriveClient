import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Car } from '../../models/car/car.model';
import { ExtrasTypesService } from '../../services/extras-types.service';
import { CarTransmission } from '../../../../core/enums/car-transmission.enum';
import { CarStatus } from '../../../../core/enums/car-status.enum';
import { CarType } from '../../../../core/enums/car-type.enum';
import { MatSelectModule } from '@angular/material/select';
import { Regexp } from '../../../../core/constants/regexp';
import { CarDTO } from '../../models/car/car.dto';

@Component({
  selector: 'app-new-car',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './new-car.component.html',
  styleUrl: './new-car.component.scss'
})
export class NewCarComponent {
  readonly dialogRef = inject(MatDialogRef<NewCarComponent>);
  data: Car = inject(MAT_DIALOG_DATA);
  carsService = inject(ExtrasTypesService);
  fb = inject(FormBuilder);

  readonly vinNumberLength = 17;

  CarTransmission = CarTransmission;
  carType = CarType;
  carStatus = CarStatus;

  form: FormGroup;
  responseErrorMessage: string | null = null;
  selectedFile: File | null = null;
  inputtedVinNumber = '';

  constructor() {

    this.form = this.fb.group({
      type: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1990), Validators.max(new Date().getFullYear())]],
      brand: ['', Validators.required],
      transmission: ['', Validators.required],
      seats: ['', [Validators.required, Validators.min(1)]],
      vin: ['', [Validators.required, Validators.pattern(Regexp.DIGITS_ONLY)]],
      price: ['', Validators.required],
      status: ['', Validators.required],
      photo: ['']
    });

    if (this.isEditMode()) {
      this.form.setValue({
        type: this.data.carTypeName,
        year: this.data.year,
        brand: this.data.brand,
        transmission: this.data.transmission,
        seats: this.data.seats,
        vin: this.data.vin,
        price: this.data.price,
        status: this.data.carStatusName,
        photo: this.data.photo,
      });

      this.inputtedVinNumber = this.data.vin;
    }
  }

  isEditMode(): boolean {
    return !!this.data;
  }

  onVinNumberInputting($event: any) {
    this.inputtedVinNumber = $event.target.value;
  }

  onFileSelected($event: any) {
    this.selectedFile = $event.target.files[0] ?? null;
  }

  onEdit() {
    console.log('onEdit fired');
  }

  onAdd() {
    const car: CarDTO = this.form.value;
    car.photo = this.selectedFile;
    console.log('car', car);
  }

  onCancel() {
    this.dialogRef.close({ confirmed: false })
  }
}
