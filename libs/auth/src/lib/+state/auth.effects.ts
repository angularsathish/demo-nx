import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { AuthActionTypes } from './auth.actions';
import * as AuthActions from './auth.actions';
import { AuthService } from './../services/auth.service';
// import { Authenticate } from '@demo-nx/interfaces';
import { User } from '@demo-nx/interfaces';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.Login),
      switchMap((action: any) =>
        this.authService.login(action.payload).pipe(
          map((response) => {
            const token = response.results.token;
            const loginDetail = JSON.parse(window.atob(token.split('.')[1]));

            const user: User = {
              username: loginDetail.username,
              id: loginDetail.userId,
              token: token,
              role: loginDetail.role,
            };
            console.log('users ????', user);
            return AuthActions.loginSuccess({ payload: user });
          }),
          catchError((error: any) => of(AuthActions.loginFailure(error)))
        )
      )
    )
  );

  navigateToLayout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.LoginSuccess),
        map((action: AuthActionTypes.LoginSuccess) => action),
        tap((response: any) => {
          console.log('response role------', response.payload.role);
          this.router.navigate([`/admin`]);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
