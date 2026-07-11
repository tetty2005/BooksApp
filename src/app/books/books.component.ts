import { Component, inject, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { BooksListComponent } from './components/books-list/books-list.component';
import { Book } from './interfaces/Book';
import { ParserService } from './services/parser.service';
import { AddEditBookService } from './services/add-edit-book.service';

@Component({
  selector: 'app-books',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    BooksListComponent,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent implements OnDestroy {
  parserService = inject(ParserService);
  books = this.parserService.books;

  private addEditBookService = inject(AddEditBookService);

  readonly dialog = inject(MatDialog);

  ngOnDestroy(): void {
    this.addEditBookService.subscription.unsubscribe();
  }

  onFileSelected(event: Event): void {
    this.parserService.setBooksFromFile(event);
  }

  addBook(): void {
    this.addEditBookService.addBook(this.books);
  }

  selectBook(book: Book): void {
    this.addEditBookService.editBook(book, this.books);
  }
}
