import { TestBed } from '@angular/core/testing';
import { Command } from 'src/model/command';
import { Operative } from 'src/model/operative';
import { LogedUser } from 'src/model/user';
import { StateService } from './state.service';

describe('Given the class StateService', () => {
  let service: StateService;
  describe('When i instance it', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({});
      service = TestBed.inject(StateService);
    });

    it('Then, should be created', () => {
      expect(service).toBeTruthy();
    });

    it('Then, should initialize state with default values', () => {
      const initialState = service.state;

      expect(initialState.user$).toBeDefined();
      expect(initialState.commands$).toBeDefined();
      expect(initialState.operatives$).toBeDefined();
      expect(initialState.currentCommand$).toBeDefined();
      expect(initialState.currentOperative$).toBeDefined();

      expect(initialState.user$.value).toEqual({} as LogedUser);
      expect(initialState.commands$.value).toEqual([] as Command[]);
      expect(initialState.operatives$.value).toEqual([] as Operative[]);
      expect(initialState.currentCommand$.value).toEqual({} as Command);
      expect(initialState.currentOperative$.value).toEqual({} as Operative);
    });

    it('Then, should properly logout and reset state', () => {
      service.state.user$.next({ user: { id: '123' } } as LogedUser);
      service.state.commands$.next([
        { id: '1', name: 'Command 1' },
      ] as Command[]);
      service.state.operatives$.next([
        { id: '1', name: 'Operative 1' },
      ] as Operative[]);
      service.state.currentCommand$.next({
        id: '1',
        name: 'Current Command',
      } as Command);
      service.state.currentOperative$.next({
        id: '1',
        name: 'Current Operative',
      } as Operative);

      service.logout();

      expect(service.state.user$.value).toEqual({} as LogedUser);
      expect(service.state.commands$.value).toEqual([] as Command[]);
      expect(service.state.operatives$.value).toEqual([] as Operative[]);
      expect(service.state.currentCommand$.value).toEqual({} as Command);
      expect(service.state.currentOperative$.value).toEqual({} as Operative);
    });

    it('Then, should return the user ID', () => {
      service.state.user$.next({ user: { id: '123' } } as LogedUser);

      const userId = service.getUserId();
      expect(userId).toBe('123');
    });
  });
});
