import { Pagination } from '../../../shared/pagination.type';
import { TransactionResponse } from '../transaction/transaction-response.type';
import { TransactionSummary } from '../TransactionSummary.type';

export type TransactionsResponse = {
  results: TransactionResponse[];
  summary: TransactionSummary;
  pagination: Pagination;
};
