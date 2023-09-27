/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Command } from 'src/model/command';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root',
})
export class RepoCommandService {
  url: string;
  token: string;

  constructor(private http: HttpClient, private state: StateService) {
    this.url = 'http://localhost:4300/command';
    this.token = '';

    this.state.state.user$.subscribe((resp) => (this.token = resp.token));
  }

  getAll(): Observable<Command[]> {
    return this.http.get(this.url, {
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    }) as Observable<Command[]>;
  }

  get(id: string): Observable<Command> {
    return this.http.get(this.url + '/' + id, {
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    }) as Observable<Command>;
  }

  post(data: FormData): Observable<Command> {
    return this.http.post(this.url, data, {
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    }) as Observable<Command>;
  }

  erase(id: string): Observable<void> {
    const casiVoid = this.http
      .delete<void>(this.url + '/' + id, {
        body: { id: id },
        headers: {
          Authorization: 'Bearer ' + this.token,
        },
      })
      .pipe(catchError((error) => throwError(() => error)));
    this.state.state.commands$.next(
      this.state.state.commands$.value.filter((command) => command.id !== id)
    );
    return casiVoid;
  }

  patchWithImg(id: string, data: FormData) {
    return this.http.patch(this.url + '/img/' + id, data, {
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    }) as Observable<Command>;
  }
  patch(id: string, data: Partial<Command>) {
    return this.http.patch(this.url + '/noimg/' + id, data, {
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    }) as Observable<Command>;
  }
}
