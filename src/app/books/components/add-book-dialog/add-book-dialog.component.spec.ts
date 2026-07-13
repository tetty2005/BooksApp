import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookDialogComponent } from './add-book-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('AddBookDialogComponent', () => {
  let component: AddBookDialogComponent;
  let fixture: ComponentFixture<AddBookDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBookDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => null } },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddBookDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call close dialog when cancel is clicked', () => {
    spyOn(component.dialogRef, 'close');
    component.onCancel();

    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('isDeleted should be true when onDelete is called', () => {
    spyOn(component.dialogRef, 'close');
    component.onDelete();

    expect(component.bookData().isDeleted).toBeTruthy();
  });

  it('isDeleted call close dialog when onDelete is called', () => {
    spyOn(component.dialogRef, 'close');
    component.onDelete();

    expect(component.dialogRef.close).toHaveBeenCalledWith(
      component.bookData(),
    );
  });
});
