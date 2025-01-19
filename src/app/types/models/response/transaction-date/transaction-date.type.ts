import { Transaction } from '../../../domain/transaction.type';

export type TransactionDate = {
  date: Date;
  expenses: Transaction[];
  revenues: Transaction[];
};
