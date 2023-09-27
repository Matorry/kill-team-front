/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Operative } from 'src/model/operative';
import { RepoOperativeService } from 'src/services/repo.operative.service';
import { OperativeDetailComponent } from './operative.detail.component';

describe('Given the class OperativeDetailComponent', () => {
  let component: OperativeDetailComponent;
  let fixture: ComponentFixture<OperativeDetailComponent>;
  let activatedRoute: ActivatedRoute;
  describe('When we instance it ', () => {
    const repoOperativeService = {
      get: () => of({ id: '1', name: 'Mock Operative' }),
      post: (_formData: FormData) => of({}),
      patchWithImg: (_id: string, _formData: FormData) => of({}),
      patch: (_id: string, _data: Partial<Operative>) => of({}),
    };

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [OperativeDetailComponent],
        providers: [
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
            provide: RepoOperativeService,
            useValue: repoOperativeService,
          },
        ],
        imports: [HttpClientTestingModule, RouterTestingModule],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(OperativeDetailComponent);
      component = fixture.componentInstance;
      activatedRoute = TestBed.inject(ActivatedRoute);

      fixture.detectChanges();
    });

    it('Then, should fetch the operative details', () => {
      component.id = '1';
      fixture.detectChanges();

      expect(repoOperativeService.get).toHaveBeenCalled;
      expect(component.operative).toEqual({
        id: '1',
        name: 'Mock Operative',
      } as Operative);
    });
  });
});
