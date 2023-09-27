import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from 'src/app/core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OperativeDetailComponent } from './commands/operative.detail/operative.detail.component';

@NgModule({
  declarations: [AppComponent, OperativeDetailComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, CoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
