import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpenseDateResponse } from '../types/models/response/expense-date/expense-date-response.type';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  private baseUrl: string = 'http://localhost:8080/economy/v1';
  constructor(private http: HttpClient) {}

  public getExpenses(): Observable<ExpenseDateResponse> {
    return this.http.get<ExpenseDateResponse>(`${this.baseUrl}/expenses`);
  }
}
