import { Observable } from 'rxjs';
import { ExpenseDateResponse } from '../types/models/response/expense-date/expense-date-response.type';
import { ExpenseRequest } from '../types/models/request/expense/expense-request.type';

export interface ExpenseServicePort {
  getExpenses(): Observable<ExpenseDateResponse>;
  save(expense: ExpenseRequest): Observable<Object>;
}
