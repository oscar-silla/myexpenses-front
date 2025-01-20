import { Observable } from 'rxjs';
import { TransactionDateResponse } from '../types/models/response/transaction-date/transaction-date-response.type';
import { TransactionRequest } from '../types/models/request/transaction/transaction-request.type';
import { TransactionResponse } from '../types/models/response/transaction/transaction-response.type';

export interface TransactionServicePort {
  getTransaction(id: string): Observable<TransactionResponse>;
  getTransactions(): Observable<TransactionDateResponse>;
  save(expense: TransactionRequest): Observable<Object>;
  modify(id: string, expense: TransactionRequest): Observable<Object>;
  delete(id: string): Observable<Object>;
}
