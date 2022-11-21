import { Injectable } from '@angular/core';
import { Authenticate, User } from '@demo-nx/interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject$: any = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject$.asObservable();

  public get currentUserValue(): User {
    return this.userSubject$.value;
  }

  constructor(private httpClient: HttpClient) {
    const user = sessionStorage.getItem('user');
    if (user) {
      this.userSubject$.next(JSON.parse(user));
    }
  }
  login(authenticate: Authenticate): Observable<any> {
    console.log(authenticate, '????');
    return this.httpClient
      .post<any>('http://localhost:3000/api/auth/login', authenticate)
      .pipe(
        tap((response) => {
          console.log('user', response);
          //   if(response.code === 200) {

          //   }
          const token = response.results.token;
          const loginDetail = JSON.parse(window.atob(token.split('.')[1]));
          // console.log(
          //   'token test',
          //   JSON.parse(window.atob(token.split('.')[1]))
          // );
          const user: User = {
            username: loginDetail.username,
            id: loginDetail.userId,
            token: token,
            role: loginDetail.role,
          };
          this.userSubject$.next(response.results);
          sessionStorage.setItem('user', JSON.stringify(user));
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.userSubject$.next(null);
    return of({ success: false });
  }
}
