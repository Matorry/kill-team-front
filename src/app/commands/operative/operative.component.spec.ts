import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { RepoCommandService } from 'src/services/repo.comand.service';
import { RepoOperativeService } from 'src/services/repo.operative.service';
import { OperativeComponent } from './operative.component';

describe('Given the class OperativeComponent', () => {
  let component: OperativeComponent;
  let fixture: ComponentFixture<OperativeComponent>;
  describe('When i instance it', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [OperativeComponent],
        providers: [RepoOperativeService, RepoCommandService],
        imports: [HttpClientTestingModule, HttpClientModule, CommonModule],
      });
      fixture = TestBed.createComponent(OperativeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('Then, should create', () => {
      expect(component).toBeTruthy();
    });
    it('Then, handleDelete should delete a command and navigate', () => {
      const repo = TestBed.inject(RepoOperativeService);
      const id = '1';
      const eraseSpy = spyOn(repo, 'erase').and.returnValue(of(null));
      const getAllSpy = spyOn(repo, 'getAll').and.returnValue(of([]));

      component.handleDelete(id);
      expect(getAllSpy).toHaveBeenCalled;
      expect(eraseSpy).toHaveBeenCalledWith(id);
    });
  });
});
