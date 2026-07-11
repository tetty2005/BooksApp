import { inject, Injectable, WritableSignal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { Book } from '../interfaces/Book';
import { AddBookDialogComponent } from '../components/add-book-dialog/add-book-dialog.component';
import { BookModel } from '../interfaces/BookModel';

@Injectable({
  providedIn: 'root'
})
export class AddEditBookService {
  subscription = new Subscription();

  readonly dialog = inject(MatDialog);

  addBook(books: WritableSignal<Book[]>): void {
    const dataBook = this.createEmptyBookModel();

    this.openDialog(dataBook, books);
  }

  editBook(book: Book, books: WritableSignal<Book[]>): void {
    const dataBook = this.getBookModel(book);

    this.openDialog(dataBook, books);
  }

  private openDialog(data: BookModel, books: WritableSignal<Book[]>): void {
    const dialogRef = this.dialog.open(
      AddBookDialogComponent,
      { data }
    );

    this.subscription.add(dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        const book = this.getBookFromDialogData(data, books);

        if (data.isDeleted) {
            books.update(list =>
              list.filter(book => book.info.id !== data.id)
            );
          } else if (data.id) {
            books.update(list => {
              const index = list.findIndex(book => book.info.id === data.id);

            if (index !== -1) {
              list[index] = book;
            }

            return [...list];
          });
        } else {
          books.update(list => [...list, book]);
        }
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

  private getBookModel(book: Book): BookModel {
    const { author, title, pages, info } = book;

    return {
      authorName: author.name,
      authorSurname: author.surname,
      title,
      pages: Number(pages),
      id: info.id,
    };
  }

  private getBookFromDialogData(
    data: BookModel,
    books: WritableSignal<Book[]>
  ): Book {
    const { id, authorName, authorSurname, title } = data;

    return {
      author: {
        name: authorName,
        surname: authorSurname,
      },
      title,
      pages: data.pages.toString(),
      info: {
        id: id || this.generateId(books),
      }
    };
  }

  private generateId(books: WritableSignal<Book[]>): string {
    const numbersArray: number[] = books()
      .map(book => Number(book.info.id));
    const highestNumber = Math.max(...numbersArray);
    const newId = highestNumber + 1;

    return newId.toString();
  }
}