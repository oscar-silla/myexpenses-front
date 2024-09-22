import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  private baseUrl: string = 'http://localhost:8080/economy/v1';
  constructor(private http: HttpClient) {}

  public getExpenses(): Observable<any> {
    return this.http.get(`${this.baseUrl}/expenses`);
  }
}
