/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Command } from 'src/model/command';
import { RepoCommandService } from 'src/services/repo.comand.service';
import { StateService } from 'src/services/state.service';

@Component({
  selector: 'killteam-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss'],
})
export class CommandComponent {
  @Input() commands!: Command[];
  constructor(
    private repo: RepoCommandService,
    private router: Router,
    private state: StateService
  ) {}
  handleDelete(id: string) {
    this.repo.erase(id).subscribe(() => {
      this.repo
        .getAll()
        .subscribe((resp) => this.state.state.commands$.next(resp));
    });
  }
}
