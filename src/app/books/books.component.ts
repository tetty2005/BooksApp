import { Component, signal } from '@angular/core';
import * as xml2js from 'xml2js';

import { Book } from './interfaces/Book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent {
  selectedFile: File | null = null;
  books = signal<Book | null>(null);

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const xmlString = e?.target?.result as string;
        this.setBooks(xmlString);
      };

      reader.readAsText(this.selectedFile);
    }
  }

  setBooks(xml: string) {
    const parser = new xml2js.Parser({ attrkey: 'info', explicitArray: false, trim: true });

    parser.parseString(xml, (err, result) => {
      if (err) {
        console.error('Parsing error:', err);
        return;
      }
      this.books.set(result.catalog.book);
      console.log('Converted JSON Object:', this.books());
    });
  }
}
