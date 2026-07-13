import { TestBed } from '@angular/core/testing';
import { FilterBooksService } from './filter-books.service';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from '../interfaces/Book';

describe('FilterBooksService', () => {
  let service: FilterBooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterBooksService],
    });
    service = TestBed.inject(FilterBooksService);
  });

  it('creates service', () => {
    expect(service).toBeTruthy();
  });

  it('should set filter value', () => {
    const books = new MatTableDataSource<Book>([]);
    const mockEvent = {
      target: { value: 'Test Title' },
    };
    service.applyFilter(mockEvent as any, books);

    expect(books.filter).toBe('test title');
  });
});
