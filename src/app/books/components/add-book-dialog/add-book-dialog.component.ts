import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDivider } from '@angular/material/divider';

import { BookModel } from '../../interfaces/BookModel';

@Component({
  selector: 'app-add-book-dialog',
  templateUrl: './add-book-dialog.component.html',
  styleUrl: './add-book-dialog.component.css',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDivider,
  ],
})
export class AddBookDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddBookDialogComponent>);
  readonly data = inject<BookModel>(MAT_DIALOG_DATA);
  readonly bookData = model<BookModel>(this.data);

  onCancel(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    this.bookData().isDeleted = true;
    this.dialogRef.close(this.bookData());
  }
}
