import { Transaction } from '../../../domain/transaction.type';
import { TransactionDateAmount } from '../tansaction-date-amount/transaction-date-amount.type';

export type TransactionDate = {
  date: Date;
  expenses: Transaction[];
  revenues: Transaction[];
  amount: TransactionDateAmount;
};
