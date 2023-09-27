/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { Command } from 'src/model/command';
import { Operative } from 'src/model/operative';
import { RepoCommandService } from 'src/services/repo.comand.service';
import { RepoOperativeService } from 'src/services/repo.operative.service';
import { StateService } from 'src/services/state.service';
import { OperativeComponent } from '../operative/operative.component';
import { OperativesComponent } from './operatives.component';

describe('Given the class OperativesComponent', () => {
  let component: OperativesComponent;
  let fixture: ComponentFixture<OperativesComponent>;
  let repoCommandServiceSpy: jasmine.SpyObj<RepoCommandService>;
  let repoOperativeServiceSpy: jasmine.SpyObj<RepoOperativeService>;
  let stateService: StateService;
  describe('When i instance it', () => {
    beforeEach(() => {
      const commandSpy = jasmine.createSpyObj('RepoCommandService', ['get']);
      const operativeSpy = jasmine.createSpyObj('RepoOperativeService', [
        'getCommandOperatives',
        'get',
      ]);
      commandSpy.get.and.returnValue(of({} as Command));
      operativeSpy.getCommandOperatives.and.returnValue(of([{}, {}]));
      operativeSpy.get.and.returnValue(of({} as Operative));
      class MockStateService {
        state = {
          operatives$: new BehaviorSubject<Operative[]>([
            { id: '1' } as Operative,
          ]),
        };
      }

      TestBed.configureTestingModule({
        imports: [],
        declarations: [OperativesComponent, OperativeComponent],
        providers: [
          { provide: RepoCommandService, useValue: commandSpy },
          { provide: RepoOperativeService, useValue: operativeSpy },
          { provide: StateService, useClass: MockStateService },
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {
                paramMap: convertToParamMap({ id: '1' }),
              },
            },
          },
          StateService,
          Router,
        ],
      });

      fixture = TestBed.createComponent(OperativesComponent);
      component = fixture.componentInstance;
      repoCommandServiceSpy = TestBed.inject(
        RepoCommandService
      ) as jasmine.SpyObj<RepoCommandService>;
      repoOperativeServiceSpy = TestBed.inject(
        RepoOperativeService
      ) as jasmine.SpyObj<RepoOperativeService>;
      stateService = TestBed.inject(StateService);
    });

    it('Then, should create', () => {
      expect(component).toBeTruthy();
    });

    it('Then, should call get() method of RepoCommandService and update command', () => {
      const mockCommand: Command = { id: '1', name: 'Command 1' } as Command;

      repoCommandServiceSpy.get.and.returnValue(of(mockCommand));

      component.ngOnInit();

      expect(repoCommandServiceSpy.get).toHaveBeenCalled;
      expect(component.command).toEqual(mockCommand);
    });

    it('Then, should call getCommandOperatives() method of RepoOperativeService and update operatives', () => {
      const mockOperatives: Operative[] = [
        { id: '1', name: 'Operative 1' } as Operative,
        { id: '2', name: 'Operative 2' } as Operative,
      ];

      repoOperativeServiceSpy.getCommandOperatives.and.returnValue(
        of(mockOperatives)
      );

      component.getOperatives();

      expect(repoOperativeServiceSpy.getCommandOperatives).toHaveBeenCalled;
      expect(stateService.state.operatives$.value).toEqual(mockOperatives);
    });

    it('Then, should navigate to /error if getCommandOperatives() method of RepoOperativeService returns an error', () => {
      const navigateSpy = spyOn((<any>component).router, 'navigate');

      repoOperativeServiceSpy.getCommandOperatives.and.returnValue(
        throwError(new Error('Error fetching operatives'))
      );

      component.getOperatives();

      expect(navigateSpy).toHaveBeenCalledWith(['/error']);
    });

    it('Then, should call get() method of RepoOperativeService and update operative', () => {
      const mockOperative = { id: '1', name: 'Operative 1' } as Operative;

      repoOperativeServiceSpy.get.and.returnValue(of(mockOperative));

      component.getOperative('1');

      expect(repoOperativeServiceSpy.get).toHaveBeenCalled;
      expect(stateService.state.currentOperative$.value).toEqual(mockOperative);
    });
    it('Then, should navigate to /error if get() method of RepoOperativeService returns an error', () => {
      const navigateSpy = spyOn((<any>component).router, 'navigate');

      repoOperativeServiceSpy.get.and.returnValue(
        throwError(new Error('Error fetching operatives'))
      );

      component.getOperative('1');

      expect(navigateSpy).toHaveBeenCalledWith(['/error']);
    });
    it('Then, should call get() method of RepoOperativeService without id', () => {
      component.getOperative('');

      expect(repoOperativeServiceSpy.get).not.toHaveBeenCalled;
      expect(component.getOperatives).toHaveBeenCalled;
    });
    it('Then, should call handleNextPage() method', () => {
      component.currentPage = 2;
      component.pageCount = 10;

      component.handleNextPage();

      expect(component.changePage).toHaveBeenCalled;
    });
    it('Then, should call handlePreviousPage() method', () => {
      component.currentPage = 2;

      component.handlePreviousPage();

      expect(component.changePage).toHaveBeenCalled;
    });
  });
});
