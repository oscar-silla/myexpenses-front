import { Observable } from 'rxjs';
import { TransactionDateResponse } from '../types/models/response/transaction-date/transaction-date-response.type';
import { ExpenseRequest } from '../types/models/request/expense/expense-request.type';
import { ExpenseResponse } from '../types/models/response/expense/expense-response.type';

export interface TransactionServicePort {
  getTransaction(id: string): Observable<ExpenseResponse>;
  getTransactions(): Observable<TransactionDateResponse>;
  save(expense: ExpenseRequest): Observable<Object>;
  modify(id: string, expense: ExpenseRequest): Observable<Object>;
  delete(id: string): Observable<Object>;
}
