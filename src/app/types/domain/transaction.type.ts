import { TransactionCategory } from './transaction-category.type';

export type Transaction = {
  id: number;
  amount: number;
  category: TransactionCategory;
  description: string;
  date: Date;
};
