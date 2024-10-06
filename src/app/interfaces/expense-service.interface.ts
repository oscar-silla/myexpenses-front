import { Observable } from 'rxjs';
import { ExpenseDateResponse } from '../types/models/response/expense-date/expense-date-response.type';
import { ExpenseRequest } from '../types/models/request/expense/expense-request.type';
import { ExpenseResponse } from '../types/models/response/expense/expense-response.type';

export interface ExpenseServicePort {
  getExpense(id: string): Observable<ExpenseResponse>;
  getExpenses(): Observable<ExpenseDateResponse>;
  save(expense: ExpenseRequest): Observable<Object>;
  modify(id: string, expense: ExpenseRequest): Observable<Object>;
}
