import { Injectable } from '@angular/core';
import { AuthServiceInterface } from '../../interfaces/auth-service.interface';
import { Observable } from 'rxjs';
import { AuthCredentials } from '../../types/models/request/auth/auth-credentials.type';
import { Token } from '../../types/models/response/auth/token.type';
import { HttpClient } from '@angular/common/http';

//const url = 'https://myexpenses-production.up.railway.app/economy/v1';
const url = 'http://localhost:8080/economy/v1';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements AuthServiceInterface {
  constructor(private http: HttpClient) {}

  login(credentials: AuthCredentials): Observable<Token> {
    return this.http.post<Token>(`${url}/login`, credentials);
  }
}
