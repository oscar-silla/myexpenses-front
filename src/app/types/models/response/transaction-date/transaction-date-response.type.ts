import { Pagination } from '../../../shared/pagination.type';
import { TransactionDate } from './transaction-date.type';

export type TransactionDateResponse = {
  results: TransactionDate[];
  pagination: Pagination;
};
