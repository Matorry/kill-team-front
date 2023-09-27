/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { Operative } from 'src/model/operative';
import { RepoOperativeService } from './repo.operative.service';
import { StateService } from './state.service';

describe('Given the class RepoOperativeService', () => {
  describe('When i instance his methods', () => {
    let service: RepoOperativeService;
    let httpMock: HttpTestingController;
    const mockStateService = {
      state: {
        user$: new BehaviorSubject({ token: 'testToken' }),
        operatives$: new BehaviorSubject([]),
      },
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          RepoOperativeService,
          { provide: StateService, useValue: mockStateService },
        ],
      });
      service = TestBed.inject(RepoOperativeService);
      httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
      httpMock.verify();
    });

    it('Then, should be created', () => {
      expect(service).toBeTruthy();
    });

    it('Then, should get all operatives', () => {
      service.getAll().subscribe();
      const request = httpMock.expectOne('http://localhost:4300/operative');
      expect(request.request.method).toBe('GET');
      expect(request.request.headers.get('Authorization')).toBe(
        'Bearer testToken'
      );
    });

    it('Then, should get command operatives', () => {
      service.getCommandOperatives('1').subscribe();
      const request = httpMock.expectOne(
        'http://localhost:4300/operative/get/1'
      );
      expect(request.request.method).toBe('GET');
      expect(request.request.headers.get('Authorization')).toBe(
        'Bearer testToken'
      );
    });

    it('Then, should get operative', () => {
      service.get('1').subscribe();
      const request = httpMock.expectOne('http://localhost:4300/operative/1');
      expect(request.request.method).toBe('GET');
      expect(request.request.headers.get('Authorization')).toBe(
        'Bearer testToken'
      );
    });

    it('Then, should post operative', () => {
      service.post(new FormData()).subscribe();
      const request = httpMock.expectOne('http://localhost:4300/operative');
      expect(request.request.method).toBe('POST');
      expect(request.request.headers.get('Authorization')).toBe(
        'Bearer testToken'
      );
    });

    it('Then, should erase operative', () => {
      service.erase('1').subscribe();
      const request = httpMock.expectOne({
        url: 'http://localhost:4300/operative/1',
        method: 'DELETE',
      });
      expect(request.request.method).toBe('DELETE');
      expect(request.request.headers.get('Authorization')).toBe(
        'Bearer testToken'
      );
    });

    it('Then, should patchWithImg operative', () => {
      service.patchWithImg('1', {} as FormData).subscribe();
      const request = httpMock.expectOne({
        url: 'http://localhost:4300/operative/img/1',
        method: 'PATCH',
      });
      expect(request.request.method).toBe('PATCH');
      expect(request.request.headers.get('Authorization')).toBe(
        'Bearer testToken'
      );
    });
    it('Then, should erase operative with error', () => {
      const eventError = new ErrorEvent('Network error', {
        message: 'undefined ',
      });

      service.erase('4').subscribe({
        next: (_response) => fail('should have failed with a network error'),
        error: (error: Error) => {
          expect(error.message).toThrowError;
        },
      });
      const request = httpMock.expectOne({
        url: 'http://localhost:4300/operative/4',
        method: 'DELETE',
      });
      request.error(eventError);

      expect(request.request.method).toBe('DELETE');
      expect(request.request.headers.get('Authorization')).toBe(
        'Bearer testToken'
      );
    });
    it('Then, should patch operative', () => {
      service.patch('1', {} as Operative).subscribe();
      const request = httpMock.expectOne({
        url: 'http://localhost:4300/operative/noimg/1',
        method: 'PATCH',
      });
      expect(request.request.method).toBe('PATCH');
      expect(request.request.headers.get('Authorization')).toBe(
        'Bearer testToken'
      );
    });
  });
});
