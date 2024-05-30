import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { AuthActions } from './action-types';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
  ) {}

  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.login),
        tap(({ user }) => localStorage.setItem('user', JSON.stringify(user))),
      ),

    { dispatch: false },
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap((action) => {
          localStorage.removeItem('user');
          this.router.navigateByUrl('/login');
        }),
      ),

    { dispatch: false },
  );
}
