import { Component, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../../../Services/auth'; // تأكد من أن المسار صحيح

// واجهة بيانات مخصصة لهذا الكومبوننت
export interface DeliveryBoyData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  accountType: 'DeliveryBoy'; // القيمة ثابتة هنا
}

@Component({
  selector: 'app-add-delivery-boy', // اسم الكومبوننت الجديد
  standalone: true,
  imports: [CommonModule, FormsModule],
  // استخدم template و style خاصين به
  templateUrl: './add-delivery-boy.html',
  styleUrls: ['./add-delivery-boy.scss']
})
export class AddDeliveryBoyComponent {
  @Output() formClosed = new EventEmitter<void>(); // لإغلاق الفورم من الأب

  constructor(private _auth: Auth) { }

  registerData: DeliveryBoyData = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    accountType: 'DeliveryBoy' // قيمة ثابتة لا تحتاج لإدخال من المستخدم
  };

  showPassword = false;
  isLoading = false;
  errorMessage = '';

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  passwordsMatch(): boolean {
    return this.registerData.password === this.registerData.confirmPassword;
  }

  onSubmit() {
    if (this.isLoading || !this.passwordsMatch()) return;

    this.isLoading = true;
    this.errorMessage = '';

    // لا نحتاج لإرسال confirmPassword للـ API
    const { confirmPassword, ...sendData } = this.registerData;

    // استدعاء نفس دالة التسجيل
    this._auth.register(sendData).subscribe({
      next: (res) => {
        alert('Delivery Boy has been added successfully!');
        this.isLoading = false;
        this.formClosed.emit(); // أبلغ الأب أن العملية تمت بنجاح ليقوم بإغلاق الفورم
      },
      error: (err) => {
        console.error('Add User Error:', err);
        this.errorMessage = err.error?.message || 'Failed to add user. Please try again.';
        this.isLoading = false;
      }
    });
  }

  // دالة للإلغاء
  cancel() {
    this.formClosed.emit(); // أبلغ الأب أن المستخدم ألغى العملية
  }
}