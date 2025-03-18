import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRequest } from '../types/models/request/user/user-request.type';
import { Observable } from 'rxjs';
import { UserServicePort } from '../interfaces/user-service.interface';

//const url = 'https://myexpenses-production.up.railway.app/economy/v1';
const url = 'http://localhost:8080/economy/v1';

@Injectable({
  providedIn: 'root',
})
export class UserService implements UserServicePort {
  private baseUrl: string = url;
  constructor(private http: HttpClient) {}

  public save(body: UserRequest): Observable<Object> {
    return this.http.post<Object>(`${this.baseUrl}/users`, body);
  }
}
