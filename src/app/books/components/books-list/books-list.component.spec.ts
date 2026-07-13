import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksListComponent } from './books-list.component';
import { By } from '@angular/platform-browser';
import { mockBooks } from '../../../test-mocks/mock-books';

describe('BooksListComponent', () => {
  let component: BooksListComponent;
  let fixture: ComponentFixture<BooksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BooksListComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('books', mockBooks);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displayedBooks length should equal books array length', () => {
    expect(component.displayedBooks.data.length).toEqual(mockBooks.length);
  });

  it('displayedBooks length should equal books array length', () => {
    fixture.componentRef.setInput('books', [
      { author: { name: 'name', surname: 'surname' } },
      { author: { name: 'name', surname: 'surname' } },
    ]);
    fixture.detectChanges();

    expect(component.displayedBooks.data.length).toEqual(2);
  });

  it('should render a rows with books', () => {
    const books = fixture.debugElement.queryAll(By.css('.mat-mdc-row'));

    expect(books.length).toEqual(mockBooks.length);
  });

  it('a click on row should call onBook method', () => {
    const books = fixture.debugElement.queryAll(By.css('.mat-mdc-row'));
    books[0].triggerEventHandler('click');

    expect(component.onBook).toHaveBeenCalled;
  });

  it('should emit data when row is clicked', () => {
    const books = fixture.debugElement.queryAll(By.css('.mat-mdc-row'));
    spyOn(component.selectBook, 'emit');
    books[0].triggerEventHandler('click');

    expect(component.selectBook.emit).toHaveBeenCalledWith(mockBooks[0]);
  });
});
