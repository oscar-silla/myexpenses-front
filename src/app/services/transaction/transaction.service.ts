import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionDateResponse } from '../../types/models/response/transaction-date/transaction-date-response.type';
import { TransactionServicePort } from '../../interfaces/transaction-service.interface';
import { TransactionRequest } from '../../types/models/request/transaction/transaction-request.type';
import { TransactionResponse } from '../../types/models/response/transaction/transaction-response.type';
import { TransactionQueryParams } from '../../types/models/request/transaction/transaction-queryparams.type';

const url = 'https://myexpenses-production.up.railway.app/economy/v1';
//const url = 'http://localhost:8080/economy/v1';

@Injectable({
  providedIn: 'root',
})
export class TransactionService implements TransactionServicePort {
  private baseUrl: string = url;
  constructor(private http: HttpClient) {}

  getTransaction(id: string): Observable<TransactionResponse> {
    return this.http.get<TransactionResponse>(
      `${this.baseUrl}/transactions/${id}`
    );
  }

  public getTransactions(): Observable<TransactionDateResponse> {
    return this.http.get<TransactionDateResponse>(
      `${this.baseUrl}/transactions`
    );
  }

  public save(body: TransactionRequest): Observable<Object> {
    return this.http.post<Object>(`${this.baseUrl}/transactions`, body);
  }

  modify(
    id: string,
    expense: TransactionRequest,
    queryParams?: TransactionQueryParams
  ): Observable<Object> {
    return this.http.patch<Object>(
      `${this.baseUrl}/transactions/${id}`,
      expense,
      { params: queryParams }
    );
  }

  delete(id: string): Observable<Object> {
    return this.http.delete<TransactionResponse>(
      `${this.baseUrl}/transactions/${id}`
    );
  }
}
