import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { BookAttributes } from '../enums/book-attributes.enum';
import { Book } from '../interfaces/Book';
import { SortState } from '../interfaces/SortState';

@Injectable({
  providedIn: 'root',
})
export class SortBooksService {
  private currentSort: SortState = {
    field: null,
    order: 'asc',
  };

  applySort(field: BookAttributes, books: MatTableDataSource<Book>): void {
    const sort = this.currentSort;

    if (sort.field === field) {
      sort.order = sort.order === 'asc' ? 'desc' : 'asc';
    } else {
      sort.field = field;
      sort.order = 'asc';
    }

    if (field === BookAttributes.Author) {
      this.sortByAuthorAndTitle(books);
    }

    books.data = books.data.sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];

      if (aValue < bValue) return sort.order === 'asc' ? -1 : 1;
      if (aValue > bValue) return sort.order === 'asc' ? 1 : -1;

      return 0;
    });
  }

  private sortByAuthorAndTitle(books: MatTableDataSource<Book>): void {
    const sort = this.currentSort;

    books.data = books.data.sort((a, b) => {
      const aAuthor = a.author.surname + ' ' + a.author.name;
      const bAuthor = b.author.surname + ' ' + b.author.name;

      if (aAuthor < bAuthor) return sort.order === 'asc' ? -1 : 1;
      if (aAuthor > bAuthor) return sort.order === 'asc' ? 1 : -1;

      if (a.title < b.title) return sort.order === 'asc' ? -1 : 1;
      if (a.title > b.title) return sort.order === 'asc' ? 1 : -1;

      return 0;
    });
  }
}
