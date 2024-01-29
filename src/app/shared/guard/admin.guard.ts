import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AdminGuard  {
  constructor(public router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // Guard for user is login or not
    // const user = JSON.parse(localStorage.getItem('user'));

    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    if (!user) {
      this.router.navigate(['/auth/login']);
      return true;
    } else if (user) {
      console.log(Object.keys(user));
      if (!Object.keys(user).length) {
        this.router.navigate(['/auth/login']);
        return true;
      }
    }
    return true;
  }
}
