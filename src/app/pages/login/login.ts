import { Token } from './../../../../node_modules/@stripe/stripe-js/dist/api/tokens.d';
import { Component } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Auth } from '../../Services/auth';

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, NgIf],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  loginData: LoginData = {
    email: '',
    password: '',
    rememberMe: false
  };

  showPassword = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private _auth: Auth,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this._route.queryParams.subscribe(params => {
      if (params['email']) {
        this.loginData.email = params['email'];
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.isLoading) return;
    this.errorMessage = '';
    this.isLoading = true;

    this._auth.Login(this.loginData).subscribe({
      next: (res) => {
        const token = res?.token;
        if (token) {
          localStorage.setItem('token', token);
          this._auth.saveUser();
          
          const role = this._auth.getRole();
          if (role === 'DeliveryBoy') {
            this._router.navigate(['/delivery']);
          } else {
            this._router.navigate(['/']);
          }
        } else {
          this.errorMessage = 'Login failed: No token received';
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Invalid email or password.';
        this.isLoading = false;
      }
    });
  }

  onForgotPassword(event: Event) {
    event.preventDefault();
    alert('Forgot password functionality would be implemented here. Please contact support for now.');
  }

  loginWithGoogle() {
    alert('Google login would be implemented here.');
  }

  loginWithFacebook() {
    alert('Facebook login would be implemented here.');
  }
}
