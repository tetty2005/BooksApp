import { Injectable, WritableSignal } from '@angular/core';
import * as xml2js from 'xml2js';

import { Book } from '../interfaces/Book';

@Injectable({
  providedIn: 'root',
})
export class DownloadLibraryService {
  convertAndSaveXml(books: WritableSignal<Book[]>) {
    const builder = new xml2js.Builder({
      rootName: 'catalog',
      xmldec: { version: '1.0', encoding: 'UTF-8' },
      renderOpts: { pretty: true, indent: ' ' },
    });
    const data = books().map((book, index) => ({
      book: {
        $: { id: book.info.id },
        title: book.title,
        author: { name: book.author.name, surname: book.author.surname },
        pages: book.pages,
      },
    }));
    const xmlString = builder.buildObject(data);

    this.downloadXmlFile(xmlString, 'library.xml');
  }

  private downloadXmlFile(xmlContent: string, fileName: string) {
    const blob = new Blob([xmlContent], {
      type: 'application/xml;charset=utf-8;',
    });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
