import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksComponent } from './books.component';
import { MatDialogRef } from '@angular/material/dialog';

const mockBook = {
  author: { name: 'name', surname: 'surname' },
  title: 'title',
  info: { id: '1' },
  pages: '100',
};

describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksComponent],
      providers: [{ provide: MatDialogRef, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call uploadService when onFileSelected', () => {
    const event = new Event('input');
    spyOn(component.uploadService, 'setBooksFromFile');
    component.onFileSelected(event);

    expect(component.uploadService.setBooksFromFile).toHaveBeenCalledWith(
      event,
    );
  });

  it('should call addBook fro service when addBook is called', () => {
    spyOn(component.addEditBookService, 'addBook');
    component.addBook();

    expect(component.addEditBookService.addBook).toHaveBeenCalled();
  });

  it('should call editBook when selectBook is called', () => {
    spyOn(component.addEditBookService, 'editBook');
    component.selectBook(mockBook);

    expect(component.addEditBookService.editBook).toHaveBeenCalledWith(
      mockBook,
      component.books,
    );
  });

  it('should call uploadService when onFileSelected', () => {
    spyOn(component.downloadService, 'convertAndSaveXml');
    component.convertAndSaveXml();

    expect(component.downloadService.convertAndSaveXml).toHaveBeenCalledWith(
      component.books,
    );
  });
});
