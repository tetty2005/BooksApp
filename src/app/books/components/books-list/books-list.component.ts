import { Component, effect, inject, input, output } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { Book } from '../../interfaces/Book';
import { BookAttributes } from '../../enums/book-attributes.enum';
import { FilterBooksService } from '../../services/filter-books.service';
import { SortBooksService } from '../../services/sort-books.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.css',
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ],
})
export class BooksListComponent {
  displayedColumns: string[] = [
    BookAttributes.Author,
    BookAttributes.Title,
    BookAttributes.Pages,
  ];
  books = input.required<Book[]>();
  selectBook = output<Book>();
  clickedRows = new Set<Book>();
  displayedBooks = new MatTableDataSource<Book>([]);

  readonly dialog = inject(MatDialog);
  readonly filterBooksService = inject(FilterBooksService);
  readonly sortBooksService = inject(SortBooksService);
  readonly BookAttributes = BookAttributes;

  constructor() {
    effect(() => {
      this.displayedBooks = new MatTableDataSource<Book>(this.books());
    });
  }

  filterBooks(event: Event): void {
    this.filterBooksService.applyFilter(event, this.displayedBooks);
  }

  sortBooks(field: BookAttributes): void {
    this.sortBooksService.applySort(field, this.displayedBooks);
  }

  onBook(book: Book): void {
    this.selectBook.emit(book);
  }
}
