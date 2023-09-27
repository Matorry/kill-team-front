import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { HeaderComponent } from './header.component';

describe('Given the class HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  describe('When i instance it', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [HeaderComponent, MenuComponent],
        imports: [RouterModule.forRoot([]), HttpClientTestingModule],
      });
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('Then, should create', () => {
      expect(component).toBeTruthy();
    });
  });
});
