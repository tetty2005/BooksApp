import { TestBed } from '@angular/core/testing';
import { SortBooksService } from './sort-books.service';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from '../interfaces/Book';
import { BookAttributes } from '../enums/book-attributes.enum';
import { mockBooks } from '../../test-mocks/mock-books';

describe('SortBooksService', () => {
  let service: SortBooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SortBooksService],
    });
    service = TestBed.inject(SortBooksService);
  });

  it('creates service', () => {
    expect(service).toBeTruthy();
  });

  it('should sort books by author then title', () => {
    const books = new MatTableDataSource<Book>(mockBooks);
    service.applySort(BookAttributes.Author, books);

    expect(books.data[0].author.surname).toBe('surname A');
    expect(books.data[0].title).toBe('title B');
    expect(books.data[1].author.surname).toBe('surname A');
    expect(books.data[1].title).toBe('title C');
  });

  it('should sort books by pages', () => {
    const books = new MatTableDataSource<Book>(mockBooks);
    service.applySort(BookAttributes.Pages, books);

    expect(books.data[0].pages).toBe('100');
    expect(books.data[1].pages).toBe('200');
    expect(books.data[2].pages).toBe('300');
  });

  it('should sort books by titles', () => {
    const books = new MatTableDataSource<Book>(mockBooks);
    service.applySort(BookAttributes.Title, books);

    expect(books.data[0].title).toBe('title A');
    expect(books.data[1].title).toBe('title B');
    expect(books.data[2].title).toBe('title C');
  });
});
