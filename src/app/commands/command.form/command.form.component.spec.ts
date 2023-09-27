/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Command } from 'src/model/command';
import { RepoCommandService } from 'src/services/repo.comand.service';
import { StateService } from 'src/services/state.service';

import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { CommandFormComponent } from './command.form.component';

describe('Given the CommandFormComponent', () => {
  let component: CommandFormComponent;
  let fixture: ComponentFixture<CommandFormComponent>;
  let router: Router;
  let state: StateService;
  let activatedRoute: ActivatedRoute;
  const repoCommandService = {
    get: () => of({ id: '1', name: 'Mock Operative' }),
    post: (_formData: FormData) => of({}),
    patchWithImg: (_id: string, _formData: FormData) => of({}),
    patch: (_id: string, _data: Partial<Command>) => of({}),
  };

  const mockState = {
    getUserId: jasmine.createSpy('getUserId').and.returnValue(of('1')),
  };
  describe('When we instance it without id', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CommandFormComponent],
        providers: [
          FormBuilder,
          {
            provide: Router,
            useValue: {
              navigate: jasmine
                .createSpy('navigate')
                .and.returnValue(Promise.resolve(true)),
            },
          },
          { provide: RepoCommandService, useValue: repoCommandService },
          { provide: StateService, useValue: mockState },
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {
                paramMap: {
                  get: () => '',
                },
              },
            },
          },
        ],
        imports: [RouterTestingModule, ReactiveFormsModule],
      }).compileComponents();

      fixture = TestBed.createComponent(CommandFormComponent);
      component = fixture.componentInstance;
      router = TestBed.inject(Router);
      component.state = TestBed.inject(StateService);
      activatedRoute = TestBed.inject(ActivatedRoute);
      fixture.detectChanges();
    });
    it('Then, should create', () => {
      expect(component).toBeTruthy();
    });

    it('Then, should handle form submission for creating a new command', () => {
      const formData = new FormData();
      spyOn(repoCommandService, 'post').and.returnValue(of({}));

      component.registerForm.setValue({
        name: 'Test Command',
        faction: 'Test Faction',
        size: 'Test Size',
        imageData: null,
      });

      component.handleCreateCommand();

      expect(repoCommandService.post).toHaveBeenCalledWith(formData);

      expect(router.navigate).toHaveBeenCalledWith(['commands']);
    });
    it('Then, should handle form for create and return error', () => {
      component.registerForm.setValue({
        name: 'Test Command',
        faction: 'Test Faction',
        size: '',
        imageData: '',
      });
      component.handleCreateCommand();
      expect(component.errorMessage).toEqual(
        'Introduzca correctamente los datos'
      );
    });
    it('Then, should handle form for create and get method return error', () => {
      const error = new Error('test error');
      spyOn(repoCommandService, 'post').and.returnValue(
        throwError(() => error)
      );
      component.registerForm.setValue({
        name: 'Test Command',
        faction: 'Test Faction',
        size: 'Test Size',
        imageData: '',
      });
      component.handleCreateCommand();
      expect(component.errorMessage).toEqual('test error');
    });
  });
  describe('Wen we instance it with id', () => {
    const stateMock = {
      getUserId: jasmine.createSpy('getUserId').and.returnValue(of('1')),
    };
    const repoCommandServiceMock = repoCommandService;
    const mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => '1',
        },
      },
    };
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CommandFormComponent],
        providers: [
          FormBuilder,
          {
            provide: Router,
            useValue: {
              navigate: jasmine
                .createSpy('navigate')
                .and.returnValue(Promise.resolve(true)),
            },
          },
          { provide: RepoCommandService, useValue: repoCommandServiceMock },
          { provide: StateService, useValue: stateMock },
          {
            provide: ActivatedRoute,
            useValue: mockActivatedRoute,
          },
        ],
        imports: [RouterTestingModule, ReactiveFormsModule],
      }).compileComponents();

      fixture = TestBed.createComponent(CommandFormComponent);

      component = fixture.componentInstance;

      activatedRoute = TestBed.inject(ActivatedRoute);

      router = TestBed.inject(Router);

      component.state = TestBed.inject(StateService);

      fixture.detectChanges();
    });
    it('Then, should create', () => {
      expect(component).toBeTruthy();
    });
    it('Then, should handle form submission for editing an existing command with img', () => {
      spyOn(repoCommandService, 'patchWithImg').and.returnValue(of({}));
      spyOn(repoCommandService, 'get').and.returnValue(
        of({
          name: 'Test Command',
          faction: 'Test Faction',
          size: 'Test Size',
        } as Command)
      );
      const file = new File(['test-image-data'], 'test-image.jpg', {
        type: 'image/jpeg',
      });
      const inputElement = fixture.debugElement.query(
        By.css('input[type="file"]')
      ).nativeElement;
      const event = { target: { files: [file] } } as unknown as Event;
      inputElement.dispatchEvent(new Event('change', event));

      component.registerForm.setValue({
        name: 'Test Command',
        faction: 'Test Faction',
        size: 'Test Size',
        imageData: '',
      });

      component.handleCreateCommand();

      expect(repoCommandService.patchWithImg).toHaveBeenCalled;

      expect(router.navigate).toHaveBeenCalledWith(['commands']);
    });

    it('Then, should handle form submission for editing an existing command without img', () => {
      spyOn(repoCommandService, 'patch').and.returnValue(of({}));
      component.registerForm.setValue({
        name: 'Test Command',
        faction: 'Test Faction',
        size: 'Test Size',
        imageData: null,
      });

      component.id = '1';

      component.handleCreateCommand();

      expect(repoCommandService.patch).toHaveBeenCalledWith(
        '1',
        jasmine.objectContaining({
          id: '1',
          name: 'Test Command',
          faction: 'Test Faction',
          size: 'Test Size',
        })
      );
      expect(repoCommandService.patch).toHaveBeenCalled;
      expect(router.navigate).toHaveBeenCalledWith(['commands']);
    });
    it('Then, should handle form for create and get method return error', () => {
      const file = new File(['test-image-data'], 'test-image.jpg', {
        type: 'image/jpeg',
      });
      const inputElement = fixture.debugElement.query(
        By.css('input[type="file"]')
      ).nativeElement;
      const event = { target: { files: [file] } } as unknown as Event;
      inputElement.dispatchEvent(new Event('change', event));

      const error = new Error('test error');
      spyOn(repoCommandService, 'patchWithImg').and.returnValue(
        throwError(() => error)
      );
      component.registerForm.setValue({
        name: 'Test Command',
        faction: 'Test Faction',
        size: 'Test Size',
        imageData: '',
      });
      component.handleCreateCommand();
      expect(component.errorMessage).toEqual('test error');
    });
    it('Then, should handle form for create and get method return error', () => {
      const error = new Error('test error');
      spyOn(repoCommandService, 'patch').and.returnValue(
        throwError(() => error)
      );
      component.registerForm.setValue({
        name: 'Test Command',
        faction: 'Test Faction',
        size: 'Test Size',
        imageData: '',
      });
      component.handleCreateCommand();
      expect(component.errorMessage).toEqual('test error');
    });
  });
});
