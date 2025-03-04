import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef, } from '@angular/material/dialog';
import { ExtrasTypesService } from '../../services/extras-types.service';
import { ExtrasType } from '../../models/extras-type.model';
import { ExtrasTypeDTO } from '../../models/extras-type.dto';


@Component({
  selector: 'app-new-extras',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './new-extras.component.html',
  styleUrl: './new-extras.component.scss'
})
export class NewExtrasComponent {
  readonly dialogRef = inject(MatDialogRef<NewExtrasComponent>);
  data: ExtrasType = inject(MAT_DIALOG_DATA);
  extrasTypesService = inject(ExtrasTypesService);
  fb = inject(FormBuilder);

  form: FormGroup;
  responseErrorMessage: string | null = null;

  constructor() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]]
    })

    if (this.isEditMode()) {
      this.form.setValue({
        name: this.data.name,
        price: this.data.price
      })
    }
  }

  isEditMode(): boolean {
    return !!this.data;
  }

  onAdd() {
    this.responseErrorMessage = null;
    const extras: ExtrasTypeDTO = this.form.value;

    this.extrasTypesService.create(extras).subscribe({
      next: () => {
        this.dialogRef.close({ confirmed: true });
      },
      error: (error) => {
        this.responseErrorMessage = error.error;
      }
    });
  }

  onEdit() {
    this.responseErrorMessage = null;
    const extras: ExtrasTypeDTO = this.form.value;

    this.extrasTypesService.update(this.data.id, extras).subscribe({
      next: () => {
        this.dialogRef.close({ confirmed: true });
      },
      error: (error) => {
        this.responseErrorMessage = error.error;
      }
    });
  }

  onCancel() {
    this.dialogRef.close({ confirmed: false })
  }
}
