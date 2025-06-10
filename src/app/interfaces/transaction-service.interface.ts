import { Observable } from 'rxjs';
import { TransactionsResponse } from '../types/models/response/transaction-date/transactions-response.type';
import { TransactionRequest } from '../types/models/request/transaction/transaction-request.type';
import { TransactionResponse } from '../types/models/response/transaction/transaction-response.type';

export interface TransactionServicePort {
  getTransaction(id: string): Observable<TransactionResponse>;
  getTransactions(): Observable<TransactionsResponse>;
  save(expense: TransactionRequest): Observable<Object>;
  modify(id: string, expense: TransactionRequest): Observable<Object>;
  delete(id: string): Observable<Object>;
}
