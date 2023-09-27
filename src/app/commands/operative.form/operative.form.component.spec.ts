/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { Operative } from 'src/model/operative';
import { RepoOperativeService } from 'src/services/repo.operative.service';
import { OperativeFormComponent } from './operative.form.component';

describe('Given the class OperativeFormComponent', () => {
  let component: OperativeFormComponent;
  let fixture: ComponentFixture<OperativeFormComponent>;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  describe('When i intance it', () => {
    const repoOperativeService = {
      get: () => of({ id: '1', name: 'Mock Operative' }),
      post: (_formData: FormData) => of({}),
      patchWithImg: (_id: string, _formData: FormData) => of({}),
      patch: (_id: string, _data: Partial<Operative>) => of({}),
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [OperativeFormComponent],
        providers: [
          FormBuilder,
          {
            provide: RepoOperativeService,
            useValue: repoOperativeService,
          },
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {
                paramMap: {
                  get: () => '1',
                },
              },
            },
          },
          {
            provide: Router,
            useValue: {
              navigate: jasmine
                .createSpy('navigate')
                .and.returnValue(Promise.resolve(true)),
            },
          },
        ],
        imports: [RouterTestingModule, ReactiveFormsModule],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(OperativeFormComponent);
      component = fixture.componentInstance;
      router = TestBed.inject(Router);
      activatedRoute = TestBed.inject(ActivatedRoute);
      fixture.detectChanges();
    });

    it('Then, should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('Then, should handle form submission for creating a new operative', () => {
      const formData = new FormData();
      spyOn(repoOperativeService, 'post').and.returnValue(of({}));
      component.registerForm.setValue({
        name: 'Test Operative',
        operativeType: 'Test Type',
        faction: 'Test Faction',
        imageData: null,
        groupActivation: 'Test Activation',
        defence: 'Test Defence',
        save: 'Test Save',
        wounds: 'Test Wounds',
        moviment: 'Test Movement',
        actionPointLimit: 'Test Limit',
      });

      component.handleCreateOperative();

      expect(repoOperativeService.post).toHaveBeenCalledWith(formData);

      expect(router.navigate).toHaveBeenCalled;
    });
    it('Then, should handle form submission for patch a operative and repo return error', () => {
      const formData = new FormData();
      const error = new Error('test error');
      spyOn(repoOperativeService, 'post').and.returnValue(
        throwError(() => error)
      );
      component.registerForm.setValue({
        name: 'Test Operative',
        operativeType: 'Test Type',
        faction: 'Test Faction',
        imageData: null,
        groupActivation: 'Test Activation',
        defence: 'Test Defence',
        save: 'Test Save',
        wounds: 'Test Wounds',
        moviment: 'Test Movement',
        actionPointLimit: 'Test Limit',
      });

      component.handleCreateOperative();
      expect(repoOperativeService.post).toHaveBeenCalledWith(formData);
    });

    it('Then, should handleCreateOperative with invalid form', () => {
      component.handleCreateOperative();

      expect(component.handleCreateOperative).toThrowError;
    });

    it('Then, should handle form submission for editing an existing operative', () => {
      spyOn(repoOperativeService, 'patch').and.returnValue(of({}));

      component.registerForm.setValue({
        name: 'Test Operative',
        faction: 'Test Faction',
        operativeType: 'Test Type',
        groupActivation: 'Test Activation',
        defence: 'Test Defence',
        save: 'Test Save',
        wounds: 'Test Wounds',
        moviment: 'Test Movement',
        actionPointLimit: 'Test Limit',
        imageData: '',
      });

      component.operativeId = '1';

      component.handleCreateOperative();

      expect(repoOperativeService.patch).toHaveBeenCalledWith('1', {
        name: 'Test Operative',
        faction: 'Test Faction',
        operativeType: 'Test Type',
        groupActivation: 'Test Activation',
        defence: 'Test Defence',
        save: 'Test Save',
        wounds: 'Test Wounds',
        moviment: 'Test Movement',
        actionPointLimit: 'Test Limit',
        id: '1',
      });

      expect(router.navigate).toHaveBeenCalledWith([
        '/commands/operative-details/',
        '1',
      ]);
    });
    it('Then, should handle form submission for creating a new operative and repo return error', () => {
      const error = new Error('test error');
      spyOn(repoOperativeService, 'patch').and.returnValue(
        throwError(() => error)
      );
      component.registerForm.setValue({
        name: 'Test Operative',
        operativeType: 'Test Type',
        faction: 'Test Faction',
        imageData: null,
        groupActivation: 'Test Activation',
        defence: 'Test Defence',
        save: 'Test Save',
        wounds: 'Test Wounds',
        moviment: 'Test Movement',
        actionPointLimit: 'Test Limit',
      });

      component.handleCreateOperative();
      expect(component.errorMessage).toEqual('test error');
    });

    it('Then, should handle form submission for editing an existing operative with img', () => {
      spyOn(repoOperativeService, 'patchWithImg').and.returnValue(of({}));

      const file = new File(['test-image-data'], 'test-image.jpg', {
        type: 'image/jpeg',
      });

      const inputElement = fixture.debugElement.query(
        By.css('input[type="file"]')
      ).nativeElement;
      const event = { target: { files: [file] } } as unknown as Event;

      inputElement.dispatchEvent(new Event('change', event));

      component.registerForm.setValue({
        name: 'Test Operative',
        operativeType: 'Test Type',
        faction: 'Test Faction',
        groupActivation: 'Test Activation',
        defence: 'Test Defence',
        save: 'Test Save',
        wounds: 'Test Wounds',
        moviment: 'Test Movement',
        actionPointLimit: 'Test Limit',
        imageData: '',
      });

      component.operativeId = '1';

      component.handleCreateOperative();

      expect(repoOperativeService.patchWithImg).toHaveBeenCalledWith(
        '1',
        jasmine.any(FormData)
      );

      expect(router.navigate).toHaveBeenCalledWith([
        '/commands/operative-details/',
        '1',
      ]);
    });

    it('Then, should handle form submission for patch a operative with image and repo return error', () => {
      const file = new File(['test-image-data'], 'test-image.jpg', {
        type: 'image/jpeg',
      });

      const inputElement = fixture.debugElement.query(
        By.css('input[type="file"]')
      ).nativeElement;
      const event = { target: { files: [file] } } as unknown as Event;

      inputElement.dispatchEvent(new Event('change', event));
      const error = new Error('test error');
      spyOn(repoOperativeService, 'patchWithImg').and.returnValue(
        throwError(() => error)
      );
      component.registerForm.setValue({
        name: 'Test Operative',
        operativeType: 'Test Type',
        faction: 'Test Faction',
        groupActivation: 'Test Activation',
        defence: 'Test Defence',
        save: 'Test Save',
        wounds: 'Test Wounds',
        moviment: 'Test Movement',
        actionPointLimit: 'Test Limit',
        imageData: '',
      });

      component.handleCreateOperative();
      expect(component.errorMessage).toEqual('test error');
    });
  });
});
