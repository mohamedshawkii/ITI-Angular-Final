import { CanActivateFn } from '@angular/router';

export const notDeliveryBoyGuard: CanActivateFn = (route, state) => {
  return true;
};
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '../Services/auth';

@Injectable({
  providedIn: 'root'
})
export class NotDeliveryBoyGuard implements CanActivate {

  constructor(private auth: Auth, private router: Router) { }

  canActivate(): boolean {
    const roles = this.auth.getRole(); 

    if (roles.includes('DeliveryBoy')) {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  }

}
