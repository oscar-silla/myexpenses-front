import { inject, Injectable } from '@angular/core';
import { AuthServiceInterface } from '../../interfaces/auth-service.interface';
import { Observable } from 'rxjs';
import { AuthCredentials } from '../../types/models/request/auth/auth-credentials.type';
import { Token } from '../../types/models/response/auth/token.type';
import { HttpClient } from '@angular/common/http';
import { SecureStorageService } from '../storage/secure-storage.service';
import { Router } from '@angular/router';

//const url = 'https://myexpenses-production.up.railway.app/economy/v1';
const url = 'http://localhost:8080/economy/v1';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements AuthServiceInterface {
  private http: HttpClient = inject(HttpClient);
  private storage: SecureStorageService = inject(SecureStorageService);
  private router: Router = inject(Router);

  logout(): void {
    this.storage.removeItem('token');
    this.router.navigate(['/registro']);
  }

  public login(credentials: AuthCredentials): Observable<Token> {
    return this.http.post<Token>(`${url}/login`, credentials);
  }

  public resendVerificationCode(
    credentials: AuthCredentials
  ): Observable<void> {
    return this.http.post<void>(`${url}/resend-verification-code`, credentials);
  }
}
