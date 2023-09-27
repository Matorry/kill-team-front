/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Command } from 'src/model/command';
import { RepoCommandService } from 'src/services/repo.comand.service';
import { StateService } from 'src/services/state.service';

@Component({
  selector: 'killteam-command.form',
  templateUrl: './command.form.component.html',
  styleUrls: ['./command.form.component.scss'],
})
export class CommandFormComponent {
  registerForm: FormGroup;
  errorMessage: string | null;
  id: string | null;
  command: Command | null;
  userId: string;

  constructor(
    private fb: FormBuilder,
    private repo: RepoCommandService,
    private router: Router,
    public state: StateService,
    private route: ActivatedRoute
  ) {
    this.userId = '';
    this.errorMessage = null;
    this.id = this.route.snapshot.paramMap.get('id');
    this.command = null;
    this.userId = state.getUserId();

    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      faction: ['', [Validators.required]],
      size: ['', [Validators.required]],
      imageData: [''],
    });
    if (this.id) {
      repo.get(this.id).subscribe(
        (resp) => (
          (this.command = resp),
          (this.registerForm = this.fb.group({
            name: [this.command.name, [Validators.required]],
            faction: [this.command.faction, [Validators.required]],
            size: [this.command.size, [Validators.required]],
            imageData: [],
          }))
        )
      );
    }
  }

  commandFormData: FormData = new FormData();

  uploadFile(event: Event) {
    const target = event?.target as HTMLInputElement;
    const fileShield = target.files?.[0];
    this.registerForm.value.imageData = fileShield;
    this.commandFormData.append('imageData', this.registerForm.value.imageData);
  }

  handleCreateCommand() {
    if (!this.id) {
      if (!this.registerForm.valid) {
        this.errorMessage = 'Introduzca correctamente los datos';
        return;
      }
      this.commandFormData.append('author', this.userId);
      this.commandFormData.append('name', this.registerForm.value.name);
      this.commandFormData.append('faction', this.registerForm.value.faction);
      this.commandFormData.append('size', this.registerForm.value.size);

      this.repo.post(this.commandFormData).subscribe({
        next: (resp) => {
          this.errorMessage = null;
          this.router.navigate(['commands']);
        },
        error: (error) => {
          this.errorMessage = error.message;
        },
      });
    } else {
      if (this.commandFormData.has('imageData')) {
        this.commandFormData.append('id', this.id);
        this.commandFormData.append('author', this.userId);
        this.commandFormData.append('name', this.registerForm.value.name);
        this.commandFormData.append('faction', this.registerForm.value.faction);
        this.commandFormData.append('size', this.registerForm.value.size);
        this.repo.patchWithImg(this.id, this.commandFormData).subscribe({
          next: (resp) => {
            this.errorMessage = null;
            this.router.navigate(['commands']);
          },
          error: (error) => {
            this.errorMessage = error.message;
          },
        });
      } else {
        const data = {} as Partial<Command>;
        data.id = this.id;
        data.name = this.registerForm.value.name;
        data.faction = this.registerForm.value.faction;
        data.size = this.registerForm.value.size;
        this.repo.patch(this.id, data).subscribe({
          next: (resp) => {
            this.errorMessage = null;
            this.router.navigate(['commands']);
          },
          error: (error) => {
            this.errorMessage = error.message;
          },
        });
      }
    }
  }
}
