/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { LogedUser, LoginData, User, UserNoId } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class RepoUserService {
  url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:4300/users';
  }

  getAll(): Observable<User[]> {
    return this.http.get(this.url) as Observable<User[]>;
  }

  get(data: string): Observable<User> {
    const url = this.url + '/' + data;
    return this.http.get(url) as Observable<User>;
  }

  register(data: UserNoId): Observable<User> {
    const url = this.url + '/register';
    return this.http.post(url, data).pipe(
      map((response) => {
        return response as User;
      }),
      catchError((error) => {
        return throwError(
          () => new Error(error.error.statusMessage + ' , user alredy exist')
        );
      })
    );
  }
  login(data: LoginData): Observable<LogedUser> {
    const url = this.url + '/login';
    return this.http.patch(url, data).pipe(
      map((response) => {
        return response as LogedUser;
      }),
      catchError((error) => {
        return throwError(() => new Error(error.error.message));
      })
    );
  }
}
