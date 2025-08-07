import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '@services/auth';



export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  accountType: 'Customer' | 'BrandOwner' | 'DeliveryBoy';
}

// في نفس الملف أو في models.ts
export type RegisterRequest = Omit<RegisterData, 'confirmPassword'>;


interface PasswordStrength {
  percentage: number;
  text: string;
  class: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {

  constructor(private _auth: Auth) { }
  _router = inject(Router);

  registerData: RegisterData = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    accountType: 'Customer'
  };

  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;
  errorMessage = '';

  passwordStrength: PasswordStrength = {
    percentage: 0,
    text: '',
    class: ''
  };

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  checkPasswordStrength() {
    const password = this.registerData.password;
    let score = 0;
    let feedback = '';

    if (password.length >= 8) score += 25;
    if (/[a-z]/.test(password)) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[0-9]/.test(password)) score += 25;
    if (/[^A-Za-z0-9]/.test(password)) score += 25;

    if (score <= 25) {
      feedback = 'Weak';
      this.passwordStrength.class = 'weak';
    } else if (score <= 50) {
      feedback = 'Fair';
      this.passwordStrength.class = 'fair';
    } else if (score <= 75) {
      feedback = 'Good';
      this.passwordStrength.class = 'good';
    } else {
      feedback = 'Strong';
      this.passwordStrength.class = 'strong';
    }

    this.passwordStrength.percentage = Math.min(score, 100);
    this.passwordStrength.text = feedback;
  }

  passwordsMatch(): boolean {
    return this.registerData.password === this.registerData.confirmPassword;
  }

  onSubmit() {
    if (this.isLoading || !this.passwordsMatch()) return;

    this.isLoading = true;
    this.errorMessage = '';

    // احذف confirmPassword قبل الإرسال لو الـ API مش محتاجها
    const { confirmPassword, ...sendData } = this.registerData;

    this._auth.register(sendData).subscribe({
      next: (res) => {
        alert(`Registration successful! Welcome to Betna, ${this.registerData.firstName}!`);
        this._router.navigate(['/login'], { queryParams: { email: this.registerData.email } });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Register Error:', err);
        this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
        this.isLoading = false;
      }
    });
  }
  registerWithGoogle() {
    alert('Google registration would be implemented here.');
  }

  registerWithFacebook() {
    alert('Facebook registration would be implemented here.');
  }
}

