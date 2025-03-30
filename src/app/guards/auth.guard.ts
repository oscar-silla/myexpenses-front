import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem('token');

    if (!token) {
      const currentRoute = this.router.url;
      if (
        currentRoute === '/registro' ||
        currentRoute === '/verificacion' ||
        currentRoute === '/login'
      ) {
        return true;
      } else {
        console.log('No autenticado, redirigiendo a /registro');
        this.router.navigate(['/registro']);
        return false;
      }
    }
    return true;
  }
}
