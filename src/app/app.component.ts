import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BooksComponent } from './books/books.component';

@Component({
  selector: 'app-root',
  imports: [BooksComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BooksApp';
}
