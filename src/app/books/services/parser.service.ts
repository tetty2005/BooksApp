import { Injectable, signal } from '@angular/core';
import * as xml2js from 'xml2js';

import { Book } from '../interfaces/Book';

@Injectable({
  providedIn: 'root'
})
export class ParserService {
  books = signal<Book[]>([]);
  
  setBooksFromFile(event: Event): void {
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

  private setBooks(xml: string): void {
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
}