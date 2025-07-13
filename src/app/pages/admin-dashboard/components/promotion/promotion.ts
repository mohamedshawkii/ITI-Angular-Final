import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserManagementServic } from '../../../../Services/user-management-servic';

@Component({
  selector: 'app-promotion',
  imports: [ReactiveFormsModule],
  templateUrl: './promotion.html',
  styleUrl: './promotion.scss'
})
export class Promotion {
  _router = inject(Router)
  _UserManager = Inject(UserManagementServic)
  apiErr = '';
  //Password@1

  RegisterForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=[A-Za-z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{9,33}$/)
    ]),
    repassword: new FormControl(null, [Validators.required]),
  })

  Register() {
    // if (this.RegisterForm.valid) {
    //   this._UserManager.register(this.RegisterForm.value).subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this._router.navigate(['/login']);
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.apiErr = err.error.message;
    //     }
    //   });
    // } else {
    //   this.RegisterForm.markAllAsTouched()
    // }
  }
}
