import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FooterComponent } from 'src/app/core/footer/footer.component';
import { HeaderComponent } from 'src/app/core/header/header.component';
import { MenuComponent } from 'src/app/core/menu/menu.component';
import { AppComponent } from './app.component';
import { CommandFormComponent } from './commands/command.form/command.form.component';
import { CommandComponent } from './commands/command/command.component';
import { CommandsComponent } from './commands/commands/commands.component';
import { OperativeFormComponent } from './commands/operative.form/operative.form.component';
import { OperativeComponent } from './commands/operative/operative.component';
import { OperativesComponent } from './commands/operatives/operatives.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
describe('Given the class AppComponent', () => {
  describe('When i instance it', () => {
    beforeEach(() =>
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, HttpClientTestingModule],
        declarations: [
          AppComponent,
          MenuComponent,
          FooterComponent,
          HeaderComponent,
          CommandsComponent,
          CommandComponent,
          CommandFormComponent,
          OperativesComponent,
          OperativeComponent,
          OperativeFormComponent,
          LoginComponent,
          RegisterComponent,
        ],
      })
    );

    it('Then, should create the app', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app).toBeTruthy();
    });

    it(`Then, should have as title 'Kill Team'`, () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app.title).toEqual('Kill Team');
    });
  });
});
