import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommandFormComponent } from './command.form/command.form.component';
import { CommandComponent } from './command/command.component';
import { CommandsRoutingModule } from './commands-routing.module';
import { CommandsComponent } from './commands/commands.component';
import { OperativeFormComponent } from './operative.form/operative.form.component';
import { OperativeComponent } from './operative/operative.component';
import { OperativesComponent } from './operatives/operatives.component';

@NgModule({
  declarations: [
    CommandsComponent,
    CommandComponent,
    CommandFormComponent,
    OperativesComponent,
    OperativeComponent,
    OperativeFormComponent,
  ],
  imports: [CommonModule, CommandsRoutingModule, ReactiveFormsModule],
})
export class CommandsModule {}
