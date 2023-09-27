/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Command } from 'src/model/command';
import { Operative } from 'src/model/operative';
import { RepoCommandService } from 'src/services/repo.comand.service';
import { RepoOperativeService } from 'src/services/repo.operative.service';
import { StateService } from 'src/services/state.service';

@Component({
  selector: 'killteam-operatives',
  templateUrl: './operatives.component.html',
  styleUrls: ['./operatives.component.scss'],
})
export class OperativesComponent implements OnInit {
  command: Command;
  operatives: Operative[];
  userOperatives: Operative[];
  id: string;
  currentPage: number;
  pageSize: number;
  pageCount: number;
  isFilter: boolean;

  constructor(
    private service: RepoCommandService,
    private repo: RepoOperativeService,
    private route: ActivatedRoute,
    private router: Router,
    private state: StateService
  ) {
    this.isFilter = false;
    this.currentPage = 1;
    this.pageSize = 3;
    this.userOperatives = [];
    this.command = {} as Command;
    this.operatives = [];
    this.id = '';
    this.pageCount = 0;
    this.state.state.operatives$.subscribe(
      (resp) => (
        (this.userOperatives = this.state.state.operatives$.value),
        ((this.operatives = this.userOperatives.slice(
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize
        )),
        (this.pageCount = Math.ceil(
          this.userOperatives.length / this.pageSize
        )))
      )
    );
  }

  ngOnInit(): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.service.get(this.id).subscribe((response) => {
      this.command = response;
    });
    this.getOperatives();
  }

  getOperatives() {
    this.repo.getCommandOperatives(this.id).subscribe({
      next: (response) => {
        this.state.state.operatives$.next(response);
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      error: (_error) => {
        this.router.navigate(['/error']);
      },
    });
  }

  getOperative(id: string) {
    /////testear
    if (id) {
      this.repo.get(id).subscribe({
        next: (response) => {
          this.state.state.currentOperative$.next(response);
          this.state.state.currentOperative$.subscribe(
            (resp) => (
              (this.operatives = [this.state.state.currentOperative$.value]),
              (this.isFilter = true)
            )
          );
        },
        error: (_error) => {
          this.router.navigate(['/error']);
        },
      });
    } else {
      this.getOperatives();
      this.isFilter = false;
      this.currentPage = 1;
    }
  }
  handleNextPage() {
    this.pageCount = Math.ceil(this.userOperatives.length / this.pageSize);
    if (this.currentPage < this.pageCount) {
      this.currentPage = this.currentPage + 1;
      this.changePage();
    }
  }
  handlePreviousPage() {
    this.pageCount = Math.ceil(this.userOperatives.length / this.pageSize);
    if (this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
      this.changePage();
    }
  }
  changePage() {
    this.operatives = this.userOperatives.slice(
      (this.currentPage - 1) * this.pageSize,
      this.currentPage * this.pageSize
    );
  }
}
