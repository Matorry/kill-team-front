/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { User } from 'src/model/user';
import { RepoUserService } from 'src/services/repo.user.service';
import { LoginModule } from '../login.module';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from './register.component';

describe('Given the class RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let repo: RepoUserService;
  describe('When we instance it', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [RegisterComponent],
        providers: [RepoUserService, LoginModule],
        imports: [
          HttpClientModule,
          CommonModule,
          ReactiveFormsModule,
          RouterTestingModule.withRoutes([
            { path: 'login', component: LoginComponent },
          ]),
        ],
      });
      fixture = TestBed.createComponent(RegisterComponent);
      component = fixture.componentInstance;
      repo = TestBed.inject(RepoUserService);
      fixture.detectChanges();
    });
    it('Then, should create', () => {
      expect(component).toBeTruthy();
    });
    it('Then, it should call the RepoUserService service and use the login method to register.', () => {
      const mockLogedUser = {} as unknown as User;

      component.registerForm.setValue({
        userName: 'test',
        firstName: 'test',
        lastName: 'test',
        email: 'test',
        age: 'test',
        password: 'test',
      });
      component.registerForm.updateValueAndValidity();
      const spyRepo = spyOn(repo, 'register').and.returnValue(
        of(mockLogedUser)
      );

      component.handleRegister();
      expect(spyRepo).toHaveBeenCalled();
    });
    it('Then, it should receive an error from the user.', () => {
      const spyRepo = spyOn(repo, 'login');

      component.handleRegister();
      expect(spyRepo).not.toHaveBeenCalled();
    });
    it('Then, it should receive an error from the repository.', () => {
      component.registerForm.setValue({
        userName: 'test',
        firstName: 'test',
        lastName: 'test',
        email: 'test',
        age: 'test',
        password: 'test',
      });
      component.registerForm.updateValueAndValidity();
      const error = { message: 'Error de inicio de sesión' };
      const spyRepo = spyOn(repo, 'register').and.returnValue(
        throwError(error)
      );

      component.handleRegister();
      expect(spyRepo).toHaveBeenCalled();
      expect(
        component.registerForm.controls['password'].hasError('incorrect')
      ).toBeFalse();
      expect(component.errorMessage).toBe(error.message);
    });
  });
});
