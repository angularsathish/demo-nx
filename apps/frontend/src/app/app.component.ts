import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '@demo-nx/auth';
import * as AuthActions from '@demo-nx/auth';

@Component({
  selector: 'demo-nx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private store: Store<AuthState>) {
    const sessionStore: any = sessionStorage.getItem('user');
    const user: any = JSON.parse(sessionStore);
    if (user) {
      this.store.dispatch(AuthActions.loginSuccess(user));
    }
  }
}
