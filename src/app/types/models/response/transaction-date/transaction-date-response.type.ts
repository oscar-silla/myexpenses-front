import { Pagination } from '../../../shared/pagination.type';
import { TransactionSummary } from '../TransactionSummary.type';
import { TransactionDate } from './transaction-date.type';

export type TransactionDateResponse = {
  results: TransactionDate[];
  summary: TransactionSummary;
  pagination: Pagination;
};
