import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Command } from 'src/model/command';
import { Operative } from 'src/model/operative';
import { LogedUser } from 'src/model/user';
import { State } from 'src/types/state';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  state: State;

  constructor() {
    this.state = {
      user$: new BehaviorSubject({} as LogedUser),
      commands$: new BehaviorSubject([] as Command[]),
      operatives$: new BehaviorSubject([] as Operative[]),
      currentCommand$: new BehaviorSubject({} as Command),
      currentOperative$: new BehaviorSubject({} as Operative),
    };
  }

  logout() {
    this.state.user$.next({} as LogedUser);
    this.state.commands$.next([] as Command[]);
    this.state.operatives$.next([] as Operative[]);
    this.state.currentCommand$.next({} as Command);
    this.state.currentOperative$.next({} as Operative);
  }

  getUserId() {
    return this.state.user$.value.user.id;
  }
}
