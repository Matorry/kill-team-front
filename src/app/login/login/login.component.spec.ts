/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { CommandsComponent } from 'src/app/commands/commands/commands.component';
import { LogedUser, User } from 'src/model/user';
import { RepoUserService } from 'src/services/repo.user.service';
import { LoginModule } from '../login.module';
import { LoginComponent } from './login.component';

describe('Given the class LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let repo: RepoUserService;
  describe('When i instance it', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [LoginComponent],
        providers: [RepoUserService, LoginModule],
        imports: [
          HttpClientModule,
          CommonModule,
          ReactiveFormsModule,
          RouterTestingModule.withRoutes([
            { path: 'commands', component: CommandsComponent },
          ]),
        ],
      });
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      repo = TestBed.inject(RepoUserService);
      fixture.detectChanges();
    });
    it('Then, should create', () => {
      expect(component).toBeTruthy();
    });
    it('Then, it should call the RepoUserService service and use the login method to log in.', () => {
      const mockLogedUser: LogedUser = {
        user: {} as unknown as User,
        token: '',
      };
      component.loginForm.setValue({ userName: 'test', password: 'test' });
      component.loginForm.updateValueAndValidity();
      const spyRepo = spyOn(repo, 'login').and.returnValue(of(mockLogedUser));

      component.handleSubmit();
      expect(spyRepo).toHaveBeenCalled();
    });
    it('Then, it should receive an error from the user.', () => {
      component.loginForm.setValue({ userName: '', password: '' });
      component.loginForm.updateValueAndValidity();
      const spyRepo = spyOn(repo, 'login');

      component.handleSubmit();
      expect(spyRepo).not.toHaveBeenCalled();
    });
    it('Then, it should receive an error from the repository.', () => {
      component.loginForm.setValue({ userName: 'test', password: 'test' });
      component.loginForm.updateValueAndValidity();
      const error = { message: 'Error de inicio de sesión' };
      const spyRepo = spyOn(repo, 'login').and.returnValue(throwError(error));

      component.handleSubmit();
      expect(spyRepo).toHaveBeenCalled();
      expect(
        component.loginForm.controls['password'].hasError('incorrect')
      ).toBeFalse();
      expect(component.errorMessage).toBe(error.message);
    });
  });
});
