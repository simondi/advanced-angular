import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { Book } from "../models/book";

export function logNewerBooks(year: number) {
  return (source$: Observable<Book[]>) => source$.pipe(
    tap(books => books.forEach(b => b.publicationYear > year ? console.log(b) : null))
  );
}