import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpenseDateResponse } from '../types/models/response/expense-date/expense-date-response.type';
import { ExpenseServicePort } from '../interfaces/expense-service.interface';
import { ExpenseRequest } from '../types/models/request/expense/expense-request.type';
import { ExpenseResponse } from '../types/models/response/expense/expense-response.type';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService implements ExpenseServicePort {
  private baseUrl: string = 'http://localhost:8080/economy/v1';
  constructor(private http: HttpClient) {}

  getExpense(id: string): Observable<ExpenseResponse> {
    return this.http.get<ExpenseResponse>(`${this.baseUrl}/expenses/${id}`);
  }

  public getExpenses(): Observable<ExpenseDateResponse> {
    return this.http.get<ExpenseDateResponse>(`${this.baseUrl}/expenses`);
  }

  public save(body: ExpenseRequest): Observable<Object> {
    return this.http.post<Object>(`${this.baseUrl}/expenses`, body);
  }

  modify(id: string, expense: ExpenseRequest): Observable<Object> {
    return this.http.patch<Object>(`${this.baseUrl}/expenses/${id}`, expense);
  }
}
