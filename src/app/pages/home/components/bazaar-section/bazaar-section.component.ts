import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { AuthService } from 'src/app/services/auth.service';            //need to create auth service

@Component({
  selector: 'app-bazaar-section',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bazaar-section.component.html',
  styleUrls: ['./bazaar-section.component.scss'],
})
export class BazaarSectionComponent implements OnInit {
  ngOnInit(): void {
  }
  userRole: string = '';

  // constructor(private authService: AuthService) {}                   //need to create auth service

  // ngOnInit(): void {
  //   this.userRole = this.authService.getUserRole();
  // }

  // openWallet() {
  // هنا هتحطي اللوجيك بتاع النقاط أو تفتحي مودال الاشتراك
  // alert('Wallet/payment with points system is under development 💰');
  // }

  // addToCalendar() {
  // مثال بسيط لإضافة الحدث للتقويم (ممكن نستخدم مكتبة أو رابط خارجي)
  //   alert('Calendar event added 🗓️ (to be implemented)');
}
