import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserServicePort } from '../../interfaces/user-service.interface';
import { UserRequest } from '../../types/models/request/user/user-request.type';
import { ActivateUserRequest } from '../../types/models/request/user/user-activate.-request.type';
import { BASE_URL } from '../../../utils/app-constants';

@Injectable({
  providedIn: 'root',
})
export class UserService implements UserServicePort {
  private baseUrl: string = BASE_URL;
  private email: string = '';
  constructor(private http: HttpClient) {}

  public save(body: UserRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.baseUrl}/users`, body, {
      observe: 'response',
    });
  }

  public activate(body: ActivateUserRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.baseUrl}/users/activate`, body, {
      observe: 'response',
    });
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string): void {
    this.email = email;
  }
}
