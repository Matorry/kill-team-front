/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserNoId } from 'src/model/user';
import { RepoUserService } from 'src/services/repo.user.service';

@Component({
  selector: 'killteam-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  @Output()
  registerForm: FormGroup;
  errorMessage: string | null;

  constructor(
    private fb: FormBuilder,
    private repo: RepoUserService,
    private router: Router
  ) {
    this.errorMessage = null;
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      age: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  handleRegister() {
    if (!this.registerForm.valid) {
      this.errorMessage = 'Introduzca correctamente los datos';
      return;
    }

    const data: UserNoId = {
      ...this.registerForm.value,
      comands: [],
    };
    data.age = data.age.toString();

    this.repo.register(data).subscribe({
      next: (_response) => {
        this.errorMessage = null;
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.errorMessage = error.message;
      },
    });
  }
}
