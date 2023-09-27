import { BehaviorSubject } from 'rxjs';
import { Command } from 'src/model/command';
import { Operative } from 'src/model/operative';
import { LogedUser } from 'src/model/user';

export type State = {
  user$: BehaviorSubject<LogedUser>;
  commands$: BehaviorSubject<Command[]>;
  operatives$: BehaviorSubject<Operative[]>;
  currentCommand$: BehaviorSubject<Command>;
  currentOperative$: BehaviorSubject<Operative>;
};
