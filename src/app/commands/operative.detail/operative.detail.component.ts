/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Operative } from 'src/model/operative';
import { RepoOperativeService } from 'src/services/repo.operative.service';

@Component({
  selector: 'killteam-operative.detail',
  templateUrl: './operative.detail.component.html',
  styleUrls: ['./operative.detail.component.scss'],
})
export class OperativeDetailComponent {
  operative: Operative | null = {} as Operative;
  id: string | null;

  constructor(
    private service: RepoOperativeService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.service.get(this.id).subscribe((response) => {
        this.operative = response;
      });
    }
  }
}
