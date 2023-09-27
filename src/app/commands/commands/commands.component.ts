/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Command } from 'src/model/command';
import { RepoCommandService } from 'src/services/repo.comand.service';
import { StateService } from 'src/services/state.service';

@Component({
  selector: 'killteam-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.scss'],
})
export class CommandsComponent implements OnInit {
  commands: Command[];
  userCommands: Command[];
  currentPage: number;
  pageSize: number;
  pageCount: number;
  isFilter: boolean;

  constructor(
    private repo: RepoCommandService,
    private router: Router,
    private state: StateService
  ) {
    this.isFilter = false;
    this.currentPage = 1;
    this.pageSize = 3;
    this.userCommands = [];
    this.commands = [];
    this.pageCount = 0;
    this.state.state.commands$.subscribe(
      (resp) => (
        (this.userCommands = this.state.state.commands$.value),
        ((this.commands = this.userCommands.slice(
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize
        )),
        (this.pageCount = Math.ceil(this.userCommands.length / this.pageSize)))
      )
    );
  }

  ngOnInit(): void {
    this.getCommands();
  }

  getCommands() {
    this.repo.getAll().subscribe({
      next: (response) => {
        this.state.state.commands$.next(response);
      },
      error: (_error) => {
        this.router.navigate(['/error']);
      },
    });
  }

  getCommand(id: string) {
    if (id) {
      this.repo.get(id).subscribe({
        next: (response) => {
          this.state.state.currentCommand$.next(response);
          this.state.state.currentCommand$.subscribe(
            (resp) => (
              (this.commands = [this.state.state.currentCommand$.value]),
              (this.isFilter = true)
            )
          );
        },
        error: (_error) => {
          this.router.navigate(['/error']);
        },
      });
    } else {
      this.getCommands();
      this.isFilter = false;
      this.currentPage = 1;
    }
  }
  handleNextPage() {
    this.pageCount = Math.ceil(this.userCommands.length / this.pageSize);
    if (this.currentPage < this.pageCount) {
      this.currentPage = this.currentPage + 1;
      this.changePage();
    }
  }
  handlePreviousPage() {
    this.pageCount = Math.ceil(this.userCommands.length / this.pageSize);
    if (this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
      this.changePage();
    }
  }
  changePage() {
    this.commands = this.userCommands.slice(
      (this.currentPage - 1) * this.pageSize,
      this.currentPage * this.pageSize
    );
  }
}
