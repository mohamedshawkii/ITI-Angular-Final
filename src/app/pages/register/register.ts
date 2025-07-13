import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  accountType: 'customer' | 'brand';
  agreeToTerms: boolean;
  subscribeNewsletter: boolean;
}

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
  registerData: RegisterData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    accountType: 'customer',
    agreeToTerms: false,
    subscribeNewsletter: false
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
    if (this.isLoading) return;
    
    this.isLoading = true;
    this.errorMessage = '';

    // Simulate API call
    setTimeout(() => {
      // Mock registration logic
      if (this.registerData.email && this.registerData.password && this.passwordsMatch()) {
        console.log('Registration successful!', this.registerData);
        alert(`Registration successful! Welcome to Betna, ${this.registerData.firstName}!`);
        // In a real app, you would navigate to dashboard or verification page
      } else {
        this.errorMessage = 'Please check your information and try again.';
      }
      
      this.isLoading = false;
    }, 2000);
  }

  registerWithGoogle() {
    alert('Google registration would be implemented here.');
  }

  registerWithFacebook() {
    alert('Facebook registration would be implemented here.');
  }
}

