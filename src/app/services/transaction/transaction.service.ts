import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { from, map, Observable, switchMap } from 'rxjs';
import { TransactionsResponse } from '../../types/models/response/transaction-date/transactions-response.type';
import { TransactionServicePort } from '../../interfaces/transaction-service.interface';
import { TransactionRequest } from '../../types/models/request/transaction/transaction-request.type';
import { TransactionResponse } from '../../types/models/response/transaction/transaction-response.type';
import { TransactionQueryParams } from '../../types/models/request/transaction/transaction-queryparams.type';
import { SecureStorageService } from '../storage/secure-storage.service';
import { HttpHeaders } from '@capacitor/core';
import { BASE_URL } from '../../../utils/app-constants';

@Injectable({
  providedIn: 'root',
})
export class TransactionService implements TransactionServicePort {
  private http: HttpClient = inject(HttpClient);
  private storage: SecureStorageService = inject(SecureStorageService);
  private baseUrl: string = BASE_URL;

  private getHeaders(): Observable<{ headers: HttpHeaders }> {
    return from(this.storage.getItem('token')).pipe(
      map((token) => ({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }))
    );
  }

  public getTransaction(id: string): Observable<TransactionResponse> {
    return this.getHeaders().pipe(
      switchMap((headers) =>
        this.http.get<TransactionResponse>(
          `${this.baseUrl}/transactions/${id}`,
          headers
        )
      )
    );
  }

  public getTransactions(): Observable<TransactionsResponse> {
    return this.getHeaders().pipe(
      switchMap((headers) =>
        this.http.get<TransactionsResponse>(`${this.baseUrl}/transactions`, {
          headers: headers.headers,
          params: {
            pageNumber: 1,
            pageSize: 800,
          },
        })
      )
    );
  }

  public save(body: TransactionRequest): Observable<Object> {
    return this.getHeaders().pipe(
      switchMap((headers) =>
        this.http.post<Object>(`${this.baseUrl}/transactions`, body, headers)
      )
    );
  }

  public modify(
    id: string,
    expense: TransactionRequest,
    queryParams?: TransactionQueryParams
  ): Observable<Object> {
    return this.getHeaders().pipe(
      switchMap((headers) =>
        this.http.patch<Object>(`${this.baseUrl}/transactions/${id}`, expense, {
          params: queryParams,
          ...headers,
        })
      )
    );
  }

  public delete(id: string): Observable<Object> {
    return this.getHeaders().pipe(
      switchMap((headers) =>
        this.http.delete<Object>(`${this.baseUrl}/transactions/${id}`, headers)
      )
    );
  }
}
