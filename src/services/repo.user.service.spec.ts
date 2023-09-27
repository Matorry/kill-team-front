/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LogedUser, LoginData, User, UserNoId } from '../model/user';
import { RepoUserService } from './repo.user.service';
import { StateService } from './state.service';

describe('Given the class RepoUserService', () => {
  let service: RepoUserService;
  let httpMock: HttpTestingController;
  let state: StateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(RepoUserService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  describe('When i instance his methods', () => {
    it('Then should be call getAll', () => {
      const mockUsers = [] as unknown as User[];

      service.getAll().subscribe((users) => {
        expect(users.length).toBe(2);
        expect(users).toEqual(mockUsers);
      });

      const req = httpMock.expectOne(service.url);
      expect(req.request.method).toBe('GET');
    });
    it('Then should be call get', () => {
      const mockUsers = {} as unknown as User;

      service.get('').subscribe((user) => {
        expect(user).toEqual(mockUsers);
      });

      const req = httpMock.expectOne(service.url + '/');
      expect(req.request.method).toBe('GET');
    });
    it('Then should be call register', () => {
      const mockResp: User = {} as User;

      service.register({} as unknown as UserNoId).subscribe((resp) => {
        expect(resp).not.toBeNull();
        expect(resp).toBe(mockResp);
      });

      const reqCreate = httpMock.expectOne(service.url + '/register');
      expect(reqCreate.request.method).toEqual('POST');
      reqCreate.flush(mockResp);
    });
    it('Then request method patch should be called', async () => {
      const mockResp = {} as LogedUser;

      service.login({} as LoginData).subscribe((resp) => {
        expect(resp).not.toBeNull();
      });

      const reqLogin = httpMock.expectOne(service.url + '/login');
      expect(reqLogin.request.method).toEqual('PATCH');
      reqLogin.flush(mockResp);
    });
    it('Then should be call login and return error', () => {
      const errorEvent = new ErrorEvent('Network error', {
        message: 'Error de red',
      });
      service.login({} as LoginData).subscribe(
        (_response) => fail('should have failed with a network error'),
        (error: Error) => {
          expect(error.message).toEqual('Error de red');
        }
      );

      const req = httpMock.expectOne(service.url + '/login');

      req.error(errorEvent);
    });
    it('Then should be call register and return error', () => {
      const errorEvent = new ErrorEvent('Network error', {
        message: 'undefined , user alredy exist',
      });
      service.register({} as UserNoId).subscribe(
        (_response) => fail('should have failed with a network error'),
        (error: Error) => {
          expect(error.message).toEqual('undefined , user alredy exist');
        }
      );

      const req = httpMock.expectOne(service.url + '/register');

      req.error(errorEvent);
    });
  });
});
