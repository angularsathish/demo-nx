import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Authenticate } from '@demo-nx/interfaces';
import { AuthState } from './../../+state/auth.reducer';
import { Store } from '@ngrx/store';
import * as authActions from './../../+state/auth.actions';

@Component({
  selector: 'demo-nx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  constructor(private store: Store<AuthState>) {}
  login(authenticate: Authenticate) {
    console.log('authenticate', authenticate);
    this.store.dispatch(authActions.login({ payload: authenticate }));
  }
}
