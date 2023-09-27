import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Operative } from 'src/model/operative';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root',
})
export class RepoOperativeService {
  url: string;
  constructor(private http: HttpClient, private state: StateService) {
    this.url = 'http://localhost:4300/operative';
  }
  token = this.state.state.user$.value.token;

  getAll(): Observable<Operative[]> {
    return this.http.get(this.url, {
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    }) as Observable<Operative[]>;
  }

  getCommandOperatives(id: string): Observable<Operative[]> {
    return this.http.get(this.url + '/get/' + id, {
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    }) as Observable<Operative[]>;
  }

  get(id: string): Observable<Operative> {
    return this.http.get(this.url + '/' + id, {
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    }) as Observable<Operative>;
  }

  post(data: FormData): Observable<Operative> {
    return this.http.post(this.url, data, {
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    }) as Observable<Operative>;
  }

  erase(id: string): Observable<unknown> {
    const resp = this.http
      .delete<void>(this.url + '/' + id, {
        body: { id: id },
        headers: {
          Authorization: 'Bearer ' + this.token,
        },
      })
      .pipe(catchError((error) => throwError(() => error)));

    this.state.state.operatives$.next(
      this.state.state.operatives$.value.filter((command) => command.id !== id)
    );
    return resp;
  }
  patchWithImg(id: string, data: FormData) {
    return this.http.patch(this.url + '/img/' + id, data, {
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    }) as Observable<Operative>;
  }
  patch(id: string, data: Partial<Operative>) {
    return this.http.patch(this.url + '/noimg/' + id, data, {
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    }) as Observable<Operative>;
  }
}
