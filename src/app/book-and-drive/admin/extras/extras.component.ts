import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ExtrasTypesService } from '../services/extras-types.service';
import { ExtrasType } from '../models/extras-type.model';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { NewExtrasComponent } from './new-extras/new-extras.component';


@Component({
  selector: 'app-extras',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './extras.component.html',
  styleUrl: './extras.component.scss'
})
export class ExtrasComponent implements OnInit {
  dialog = inject(MatDialog);
  extrasTypesService = inject(ExtrasTypesService);

  displayedColumns: string[] = ['position', 'name', 'price', 'actions'];
  extrasTypes$: Observable<ExtrasType[]> = new Observable;

  ngOnInit() {
    this.extrasTypes$ = this.extrasTypesService.getExtrasTypes();
  }

  onAdd() {
    this.dialog.open(NewExtrasComponent).afterClosed().subscribe(res => {
      if (res.confirmed) {
        this.extrasTypes$ = this.extrasTypesService.getExtrasTypes();
      }
    })
  }

  onEdit(extras: ExtrasType) {
    this.dialog.open(NewExtrasComponent, {
      data: extras
    }).afterClosed()
      .subscribe(res => {
        if (res.confirmed) {
          this.extrasTypes$ = this.extrasTypesService.getExtrasTypes();
        }
      })
  }

  onDelete(id: number) {
    this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this record?'
      }
    }).afterClosed()
      .subscribe(isConfirmed => {
        if (isConfirmed) {
          this.deleteExtraType(id);
        }
      })
  }

  private deleteExtraType(id: number) {
    this.extrasTypesService.delete(id).subscribe({
      next: () => {
        this.extrasTypes$ = this.extrasTypesService.getExtrasTypes();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
