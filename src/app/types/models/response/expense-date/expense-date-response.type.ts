import { Pagination } from '../../../shared/pagination.type';
import { ExpenseDate } from './expense-date.type';

export type ExpenseDateResponse = {
  results: ExpenseDate[];
  pagination: Pagination;
};
