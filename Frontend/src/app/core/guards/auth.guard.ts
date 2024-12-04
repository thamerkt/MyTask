import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Check if the token exists in localStorage
    const token = localStorage.getItem('jwtToken');

    // If the token exists, allow access, otherwise redirect to login page
    if (token) {
      return true;
    } else {
      // If no token, redirect to login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}
