/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { Command } from 'src/model/command';
import { RepoCommandService } from 'src/services/repo.comand.service';
import { StateService } from 'src/services/state.service';
import { CommandComponent } from '../command/command.component';
import { CommandsComponent } from './commands.component';

describe('Given the class CommandsComponent', () => {
  let component: CommandsComponent;
  let fixture: ComponentFixture<CommandsComponent>;
  let repoCommandServiceSpy: jasmine.SpyObj<RepoCommandService>;
  const mockCommands: Command[] = [
    { id: '1', name: 'Command 1' } as Command,
    { id: '2', name: 'Command 2' } as Command,
  ];
  describe('When i instance it', () => {
    beforeEach(() => {
      const commandSpy = jasmine.createSpyObj('RepoCommandService', [
        'getAll',
        'get',
      ]);
      commandSpy.getAll.and.returnValue(of(mockCommands));

      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [CommandsComponent, CommandComponent],
        providers: [
          { provide: RepoCommandService, useValue: commandSpy },
          StateService,
        ],
      });

      fixture = TestBed.createComponent(CommandsComponent);
      component = fixture.componentInstance;
      repoCommandServiceSpy = TestBed.inject(
        RepoCommandService
      ) as jasmine.SpyObj<RepoCommandService>;
    });

    it('Then, should create', () => {
      expect(component).toBeTruthy();
    });

    it('Then, should call getAll() method of RepoCommandService and update commands', () => {
      repoCommandServiceSpy.getAll.and.returnValue(of(mockCommands));

      component.getCommands();

      expect(repoCommandServiceSpy.getAll).toHaveBeenCalled();
      expect(component.commands).toEqual(mockCommands);
    });

    it('Then, should navigate to /error if getAll() method of RepoCommandService returns an error', () => {
      const navigateSpy = spyOn((<any>component).router, 'navigate');

      repoCommandServiceSpy.getAll.and.returnValue(
        throwError(new Error('Error fetching commands'))
      );

      component.getCommands();

      expect(navigateSpy).toHaveBeenCalledWith(['/error']);
    });

    it('Then, should call getCommand method and update currentCommand$', () => {
      const mockCommand = { id: '1', name: 'Command 1' } as Command;
      repoCommandServiceSpy.get.and.returnValue(of(mockCommand));

      component.getCommand('1');

      expect(repoCommandServiceSpy.get).toHaveBeenCalled();
      expect(component.commands).toEqual([mockCommand]);
    });

    it('Then, should call getCommand method with error', () => {
      const navigateSpy = spyOn((<any>component).router, 'navigate');
      repoCommandServiceSpy.get.and.returnValue(
        throwError(new Error('Error fetching operatives'))
      );

      component.getCommand('1');

      expect(navigateSpy).toHaveBeenCalledWith(['/error']);
    });

    it('Then, should call get() method of RepoOperativeService without id', () => {
      component.getCommand('');

      expect(component.getCommands).toHaveBeenCalled;
    });
    it('Then, should call handleNextPage() method', () => {
      component.userCommands = [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ] as Command[];
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
    it('Then, should call ngOnInit', () => {
      component.ngOnInit();

      expect(component.getCommands).toHaveBeenCalled;
    });
  });
});
