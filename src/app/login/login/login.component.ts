import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginData } from 'src/model/user';
import { RepoUserService } from 'src/services/repo.user.service';
import { StateService } from 'src/services/state.service';

@Component({
  selector: 'killteam-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private repo: RepoUserService,
    private router: Router,
    private state: StateService
  ) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  handleSubmit() {
    if (this.loginForm.valid) {
      this.errorMessage = null;
    } else {
      this.errorMessage = 'Introduzca el nombre de usuario y la contraseña';
      return;
    }

    const data: LoginData = {
      ...this.loginForm.value,
    };
    this.repo.login(data).subscribe({
      next: (response) => {
        this.state.state.user$.next(response);
        this.errorMessage = null;
        this.router.navigate(['commands']);
      },
      error: (error) => {
        this.errorMessage = error.message;
      },
    });

    this.loginForm = this.fb.group({
      userName: '',
      password: '',
    });
  }
}
