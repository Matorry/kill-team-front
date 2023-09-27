/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { Command } from 'src/model/command';
import { RepoCommandService } from './repo.comand.service';
import { StateService } from './state.service';

describe('Guiven the class RepoCommandService', () => {
  describe('When i instance it', () => {
    let service: RepoCommandService;
    let httpMock: HttpTestingController;
    const mockStateService = {
      state: {
        user$: new BehaviorSubject({ token: 'testToken' }),
        commands$: new BehaviorSubject([]),
      },
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          RepoCommandService,
          { provide: StateService, useValue: mockStateService },
        ],
      });
      service = TestBed.inject(RepoCommandService);
      httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
      httpMock.verify();
    });

    it('Then, should be created', () => {
      expect(service).toBeTruthy();
    });

    it('Then, should make a GET request to the correct URL for getAll()', () => {
      const dummyCommand = [] as Command[];
      service.getAll().subscribe((command) => {
        expect(command).toEqual(dummyCommand);
      });

      const req = httpMock.expectOne('http://localhost:4300/command');

      expect(req.request.method).toBe('GET');
    });

    it('Then, should make a GET request to the correct URL for get(id)', () => {
      const mockNewCommand = {
        id: '1',
        author: 'string',
        name: 'string',
        faction: 'string',
        members: [],
        size: 'string',
        imageData: {},
      } as unknown as Command;
      service.get('1').subscribe((command) => {
        expect(command).toEqual(mockNewCommand);
      });

      const req = httpMock.expectOne('http://localhost:4300/command' + '/1');

      expect(req.request.method).toBe('GET');
    });

    it('Then, should make a POST request to the correct URL for post(data)', () => {
      const dummyFormData = new FormData();
      dummyFormData.append('name', 'Command 1');

      service.post(dummyFormData).subscribe((command: Command) => {
        expect(command).toEqual({ name: 'Command 1' } as Command);
      });

      const req = httpMock.expectOne('http://localhost:4300/command');
      expect(req.request.method).toBe('POST');
    });

    it('Then, should make a DELETE request to the correct URL for erase(id)', () => {
      const id = '1';

      service.erase(id).subscribe();

      const req = httpMock.expectOne(`http://localhost:4300/command/${id}`);
      expect(req.request.method).toBe('DELETE');
    });
    it('Then, should patch command', () => {
      service.patch('1', {} as Command).subscribe();
      const req = httpMock.expectOne({
        url: 'http://localhost:4300/command/noimg/1',
        method: 'PATCH',
      });
      expect(req.request.method).toBe('PATCH');
      expect(req.request.headers.get('Authorization')).toBe('Bearer testToken');
    });
    it('Then, should make a DELETE with error', () => {
      const error = new ErrorEvent('Network error', {
        message: 'undefined , user alredy exist',
      });

      service.erase('7').subscribe(
        (_res) => fail('should have failed with a network error'),
        (err: Error) => {
          expect(err.message).toThrowError;
        }
      );
      const req = httpMock.expectOne({
        url: 'http://localhost:4300/command/7',
        method: 'DELETE',
      });
      req.error(error);

      expect(req.request.headers.get('Authorization')).toBe('Bearer testToken');
    });
    it('Then, should patchWithImg command', () => {
      service.patchWithImg('1', {} as FormData).subscribe();
      const req = httpMock.expectOne({
        url: 'http://localhost:4300/command/img/1',
        method: 'PATCH',
      });
      expect(req.request.method).toBe('PATCH');
      expect(req.request.headers.get('Authorization')).toBe('Bearer testToken');
    });
  });
});
