import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import * as ReadingListActions from './reading-list.actions';

@Injectable()
export class SnackBarEffects {
  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.addToReadingList),
      switchMap(({ book }) =>
        this.snackBar
          .open(`${book.title} added to reading list`, 'Undo')
          .onAction()
          .pipe(
            map(() => ReadingListActions.addToReadingListUndoClicked({ book }))
          )
      )
    )
  );

  removeBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.removeFromReadingList),
      switchMap(({ item }) =>
        this.snackBar
          .open(`${item.title} removed from reading list`, 'Undo')
          .onAction()
          .pipe(
            map(() =>
              ReadingListActions.removeFromReadingListUndoClicked({ item })
            )
          )
      )
    )
  );

  constructor(private actions$: Actions, private snackBar: MatSnackBar) {}
}
