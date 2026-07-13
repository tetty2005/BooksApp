import { TestBed } from '@angular/core/testing';
import { AddEditBookService } from './add-edit-book.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { signal } from '@angular/core';
import { mockBooks } from '../../test-mocks/mock-books';

const mockDialogRef = {
  afterClosed: () => of(),
};

const mockMatDialog = {
  open: () => mockDialogRef,
};

describe('AddEditBookService', () => {
  let service: AddEditBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [
        AddEditBookService,
        { provide: MatDialog, useValue: mockMatDialog },
      ],
    });
    service = TestBed.inject(AddEditBookService);
  });

  it('creates service', () => {
    expect(service).toBeTruthy();
  });

  it('creates service', () => {
    const signalBooks = signal(mockBooks);
    spyOn(mockMatDialog, 'open').and.callThrough();
    service.addBook(signalBooks);

    expect(mockMatDialog.open).toHaveBeenCalled();
  });
});
