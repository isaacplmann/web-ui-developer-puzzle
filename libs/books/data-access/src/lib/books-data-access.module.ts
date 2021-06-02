import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BooksEffects } from './+state/books.effects';
import * as fromBooks from './+state/books.reducer';
import { ReadingListEffects } from './+state/reading-list.effects';
import * as fromReadingList from './+state/reading-list.reducer';
import { SnackBarEffects } from './+state/snack-bar.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromBooks.BOOKS_FEATURE_KEY, fromBooks.reducer),
    StoreModule.forFeature(
      fromReadingList.READING_LIST_FEATURE_KEY,
      fromReadingList.reducer
    ),
    MatSnackBarModule,
    EffectsModule.forFeature([
      BooksEffects,
      ReadingListEffects,
      SnackBarEffects,
    ]),
  ],
})
export class BooksDataAccessModule {}
