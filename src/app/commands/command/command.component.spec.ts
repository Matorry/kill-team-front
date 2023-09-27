/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Command } from 'src/model/command';
import { RepoCommandService } from 'src/services/repo.comand.service';
import { StateService } from 'src/services/state.service';
import { CommandComponent } from './command.component';

describe('Given the class CommandComponent', () => {
  let component: CommandComponent;
  let fixture: ComponentFixture<CommandComponent>;
  let repoCommandService: RepoCommandService;
  let stateService: StateService;

  describe('When i instance it', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [CommandComponent],
        imports: [RouterTestingModule],
        providers: [
          RepoCommandService,
          StateService,
          HttpClientTestingModule,
          HttpClient,
          HttpHandler,
        ],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(CommandComponent);
      component = fixture.componentInstance;
      repoCommandService = TestBed.inject(RepoCommandService);
      stateService = TestBed.inject(StateService);
      component.commands = [
        { id: '1', name: 'Command 1', imageData: { url: 'a' } } as Command,
        { id: '2', name: 'Command 2', imageData: { url: 'a' } } as Command,
      ];
      fixture.detectChanges();
    });

    it('Then, should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('Then, should handle delete', () => {
      spyOn(repoCommandService, 'erase').and.returnValue(of());
      spyOn(repoCommandService, 'getAll').and.returnValue(
        of([{ id: '2' } as Command, { id: '3' } as Command])
      );
      const idToDelete = '1';
      component.handleDelete(idToDelete);

      expect(repoCommandService.erase).toHaveBeenCalledWith(idToDelete);
    });
  });
});
