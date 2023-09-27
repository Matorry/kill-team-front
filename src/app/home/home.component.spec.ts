import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('Given the class HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  describe('When i instance it', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [HomeComponent],
      });
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('Then, should create', () => {
      expect(component).toBeTruthy();
    });
  });
});
