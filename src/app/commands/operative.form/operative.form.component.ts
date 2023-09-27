/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Operative } from 'src/model/operative';
import { RepoOperativeService } from 'src/services/repo.operative.service';

@Component({
  selector: 'killteam-operative.form',
  templateUrl: './operative.form.component.html',
  styleUrls: ['./operative.form.component.scss'],
})
export class OperativeFormComponent {
  registerForm: FormGroup;
  errorMessage: string | null;
  operativeId: string | null;
  operative: Operative | null;
  id: string | null;

  constructor(
    private fb: FormBuilder,
    private repo: RepoOperativeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.operativeId = this.route.snapshot.paramMap.get('operativeId');
    this.operative = null;
    this.errorMessage = null;
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      operativeType: ['', [Validators.required]],
      faction: ['', [Validators.required]],
      imageData: [''],
      groupActivation: ['', [Validators.required]],
      defence: ['', [Validators.required]],
      save: ['', [Validators.required]],
      wounds: ['', [Validators.required]],
      moviment: ['', [Validators.required]],
      actionPointLimit: ['', [Validators.required]],
    });
    if (this.operativeId) {
      repo.get(this.operativeId).subscribe(
        (resp) => (
          (this.operative = resp),
          (this.registerForm = this.fb.group({
            name: [this.operative.name, [Validators.required]],
            operativeType: [
              this.operative.operativeType,
              [Validators.required],
            ],
            faction: [this.operative.faction, [Validators.required]],
            groupActivation: [
              this.operative.groupActivation,
              [Validators.required],
            ],
            defence: [this.operative.defence, [Validators.required]],
            save: [this.operative.save, [Validators.required]],
            wounds: [this.operative.wounds, [Validators.required]],
            moviment: [this.operative.moviment, [Validators.required]],
            actionPointLimit: [
              this.operative.actionPointLimit,
              [Validators.required],
            ],
            imageData: [],
          }))
        )
      );
    }
  }
  operativeFormData: FormData = new FormData();

  uploadFile(event: Event) {
    const target = event?.target as HTMLInputElement;
    const fileShield = target.files?.[0];
    this.registerForm.value.imageData = fileShield;
    this.operativeFormData.append(
      'imageData',
      this.registerForm.value.imageData
    );
  }

  handleCreateOperative() {
    if (!this.registerForm.valid) {
      this.errorMessage = 'Introduzca correctamente los datos';
      return;
    }
    if (this.id) {
      this.operativeFormData.append('command', this.id);
      this.operativeFormData.append('name', this.registerForm.value.name);
      this.operativeFormData.append('faction', this.registerForm.value.faction);
      this.operativeFormData.append(
        'operativeType',
        this.registerForm.value.operativeType
      );
      this.operativeFormData.append(
        'groupActivation',
        this.registerForm.value.groupActivation
      );
      this.operativeFormData.append('defence', this.registerForm.value.defence);
      this.operativeFormData.append('save', this.registerForm.value.save);
      this.operativeFormData.append('wounds', this.registerForm.value.wounds);
      this.operativeFormData.append(
        'moviment',
        this.registerForm.value.moviment
      );
      this.operativeFormData.append(
        'actionPointLimit',
        this.registerForm.value.actionPointLimit
      );

      this.repo.post(this.operativeFormData).subscribe({
        next: (resp) => {
          this.errorMessage = null;
          this.router.navigate(['/commands/details/', this.id]);
        },
        error: (error) => {
          this.errorMessage = error.message;
        },
      });
    }
    if (this.operativeId) {
      if (this.operativeFormData.has('imageData')) {
        this.operativeFormData.append('name', this.registerForm.value.name);
        this.operativeFormData.append(
          'faction',
          this.registerForm.value.faction
        );
        this.operativeFormData.append(
          'operativeType',
          this.registerForm.value.operativeType
        );
        this.operativeFormData.append(
          'groupActivation',
          this.registerForm.value.groupActivation
        );
        this.operativeFormData.append(
          'defence',
          this.registerForm.value.defence
        );
        this.operativeFormData.append('save', this.registerForm.value.save);
        this.operativeFormData.append('wounds', this.registerForm.value.wounds);
        this.operativeFormData.append(
          'moviment',
          this.registerForm.value.moviment
        );
        this.operativeFormData.append(
          'actionPointLimit',
          this.registerForm.value.actionPointLimit
        );
        this.operativeFormData.append('id', this.operativeId);
        this.repo
          .patchWithImg(this.operativeId, this.operativeFormData)
          .subscribe({
            next: (resp) => {
              this.errorMessage = null;
              this.router.navigate([
                '/commands/operative-details/',
                this.operative?.id,
              ]);
            },
            error: (error) => {
              this.errorMessage = error.message;
            },
          });
      } else {
        const data = {} as Partial<Operative>;
        data.name = this.registerForm.value.name;
        data.faction = this.registerForm.value.faction;
        data.operativeType = this.registerForm.value.operativeType;
        data.groupActivation = this.registerForm.value.groupActivation;
        data.defence = this.registerForm.value.defence;
        data.save = this.registerForm.value.save;
        data.wounds = this.registerForm.value.wounds;
        data.moviment = this.registerForm.value.moviment;
        data.actionPointLimit = this.registerForm.value.actionPointLimit;
        data.id = this.operativeId;

        this.repo.patch(this.operativeId, data).subscribe({
          next: (resp) => {
            this.errorMessage = null;
            this.router.navigate([
              '/commands/operative-details/',
              this.operative?.id,
            ]);
          },
          error: (error) => {
            this.errorMessage = error.message;
          },
        });
      }
    }
  }
}
