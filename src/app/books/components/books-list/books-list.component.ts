import { Component, effect, input } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { Book } from '../../interfaces/Book';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.css',
  imports: [ MatTableModule, MatFormFieldModule, MatInputModule ],
})
export class BooksListComponent {
  displayedColumns: string[] = ['author', 'title', 'pages'];
  books = input.required<Book[]>();
  clickedRows = new Set<Book>();
  displayedBooks = new MatTableDataSource<Book>([]);

  constructor() {
    effect(() => {
      this.displayedBooks = new MatTableDataSource<Book>(this.books());
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;

    this.displayedBooks.filterPredicate = (data, filter: string) => 
        data.title.toLowerCase().includes(filter);

    this.displayedBooks.filter = filterValue.trim().toLowerCase();
  }

  onBook(book: Book): void {
    // open edit book dialog
  }
}
