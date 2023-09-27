/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, Input } from '@angular/core';
import { Operative } from 'src/model/operative';
import { RepoOperativeService } from 'src/services/repo.operative.service';
import { StateService } from 'src/services/state.service';

@Component({
  selector: 'killteam-operative',
  templateUrl: './operative.component.html',
  styleUrls: ['./operative.component.scss'],
})
export class OperativeComponent {
  @Input() operatives!: Operative[];

  constructor(
    private repo: RepoOperativeService,
    private state: StateService
  ) {}
  handleDelete(id: string) {
    this.repo
      .erase(id)
      .subscribe((_resp) =>
        this.repo
          .getAll()
          .subscribe((response) => this.state.state.operatives$.next(response))
      );
  }
}
