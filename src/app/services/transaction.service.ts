import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionDateResponse } from '../types/models/response/transaction-date/transaction-date-response.type';
import { TransactionServicePort } from '../interfaces/transaction-service.interface';
import { ExpenseRequest } from '../types/models/request/expense/expense-request.type';
import { ExpenseResponse } from '../types/models/response/expense/expense-response.type';

@Injectable({
  providedIn: 'root',
})
export class TransactionService implements TransactionServicePort {
  private baseUrl: string = 'http://localhost:8080/economy/v1';
  constructor(private http: HttpClient) {}

  getTransaction(id: string): Observable<ExpenseResponse> {
    return this.http.get<ExpenseResponse>(`${this.baseUrl}/transactions/${id}`);
  }

  public getTransactions(): Observable<TransactionDateResponse> {
    return this.http.get<TransactionDateResponse>(
      `${this.baseUrl}/transactions`
    );
  }

  public save(body: ExpenseRequest): Observable<Object> {
    return this.http.post<Object>(`${this.baseUrl}/transactions`, body);
  }

  modify(id: string, expense: ExpenseRequest): Observable<Object> {
    return this.http.patch<Object>(
      `${this.baseUrl}/transactions/${id}`,
      expense
    );
  }

  delete(id: string): Observable<Object> {
    return this.http.delete<ExpenseResponse>(
      `${this.baseUrl}/transactions/${id}`
    );
  }
}
