import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { Book } from '../interfaces/Book';

@Injectable({
  providedIn: 'root',
})
export class FilterBooksService {
  applyFilter({ target }: Event, books: MatTableDataSource<Book>): void {
    const filterValue = (target as HTMLInputElement).value;

    books.filterPredicate = (data, filter: string) =>
      data.title.toLowerCase().includes(filter);

    books.filter = filterValue.trim().toLowerCase();
  }
}
