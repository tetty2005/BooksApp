export interface BookModel {
  authorName: string;
  authorSurname: string;
  title: string;
  pages: number;
  id?: string;
  isDeleted?: boolean;
}
