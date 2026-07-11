import { BookAttributes } from '../enums/book-attributes.enum';

export interface SortState {
  field: BookAttributes | null;
  order: 'asc' | 'desc';
}
