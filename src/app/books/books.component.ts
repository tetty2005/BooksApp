import { Component, inject, OnDestroy, signal } from '@angular/core';
import * as xml2js from 'xml2js';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { BooksListComponent } from './components/books-list/books-list.component';
import { Book } from './interfaces/Book';
import { AddBookDialogComponent } from './components/add-book-dialog/add-book-dialog.component';
import { BookModel } from './interfaces/BookModel';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-books',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    BooksListComponent,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent implements OnDestroy {
  books = signal<Book[]>([]);

  private subscription = new Subscription();
  readonly dialog = inject(MatDialog);

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const xmlString = e?.target?.result as string;
        this.setBooks(xmlString);
      };

      reader.readAsText(file);
    }
  }

  setBooks(xml: string): void {
    const parser = new xml2js.Parser({
      attrkey: 'info',
      explicitArray: false,
      trim: true
    });

    parser.parseString(xml, (err, result) => {
      if (err) {
        console.error('Parsing error:', err);
        return;
      }

      this.books.set(result.catalog.book);
    });
  }

  addBook(): void {
    const dataBook = this.createEmptyBookModel();

    this.openDialog(dataBook);
  }

  private openDialog(data: BookModel): void {
    const dialogRef = this.dialog.open(
      AddBookDialogComponent,
      { data }
    );

    this.subscription.add(dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        const book = this.getBookFromDialogData(data);
        this.books.update(books => [...books, book]);
      }
    }));
  }

  private createEmptyBookModel(): BookModel {
    return {
      authorName: '',
      authorSurname: '',
      title: '',
      pages: 0,
    };
  }

  private getBookFromDialogData(data: BookModel): Book {
    return {
      author: {
        name: data.authorName,
        surname: data.authorSurname,
      },
      title: data.title,
      pages: data.pages.toString(),
      info: {
        id: this.generateId(),
      }
    };
  }

  private generateId(): string {
    const numbersArray: number[] = this.books()
      .map(book => Number(book.info.id));
    const highestNumber = Math.max(...numbersArray);
    const newId = highestNumber + 1;

    return newId.toString();
  }
}
