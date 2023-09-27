import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandFormComponent } from './command.form/command.form.component';
import { CommandsComponent } from './commands/commands.component';
import { OperativeDetailComponent } from './operative.detail/operative.detail.component';
import { OperativeFormComponent } from './operative.form/operative.form.component';
import { OperativesComponent } from './operatives/operatives.component';

const routes: Routes = [
  { path: '', component: CommandsComponent },
  {
    path: 'new-command',
    component: CommandFormComponent,
  },
  {
    path: 'update-command/:id',
    component: CommandFormComponent,
  },
  { path: 'details/:id', component: OperativesComponent },
  {
    path: 'new-operative/:id',
    component: OperativeFormComponent,
  },
  {
    path: 'update-operative/:operativeId',
    component: OperativeFormComponent,
  },
  {
    path: 'operative-details/:id',
    component: OperativeDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommandsRoutingModule {}
