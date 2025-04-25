import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { SecureStorageService } from '../services/storage/secure-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private router = inject(Router);
  private secureStorageService = inject(SecureStorageService);

  async canActivate(): Promise<boolean> {
    const token = await this.secureStorageService.getItem('token');

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
