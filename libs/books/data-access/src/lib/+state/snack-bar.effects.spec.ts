import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { SnackBarEffects } from './snack-bar.effects';

describe('SnackBarEffects', () => {
  const actions$: Observable<any> = of();
  let effects: SnackBarEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SnackBarEffects,
        provideMockActions(() => actions$),
        {
          provide: MatSnackBar,
          useValue: {},
        },
      ],
    });

    effects = TestBed.inject<SnackBarEffects>(SnackBarEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
