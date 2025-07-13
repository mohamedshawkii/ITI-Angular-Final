import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
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

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.isLoading) return;
    
    this.isLoading = true;
    this.errorMessage = '';

    // Simulate API call
    setTimeout(() => {
      // Mock authentication logic
      if (this.loginData.email === 'admin@betna.com' && this.loginData.password === 'admin123') {
        console.log('Login successful!');
        // In a real app, you would navigate to dashboard or home
        alert('Login successful! Welcome to Betna.');
      } else if (this.loginData.email && this.loginData.password) {
        console.log('Login successful for user:', this.loginData.email);
        alert('Login successful! Welcome to Betna.');
      } else {
        this.errorMessage = 'Invalid email or password. Please try again.';
      }
      
      this.isLoading = false;
    }, 1500);
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

