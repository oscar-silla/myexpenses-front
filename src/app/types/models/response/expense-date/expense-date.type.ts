import { Expense } from '../../../domain/expense.type';

export type ExpenseDate = {
  date: Date;
  expenses: Expense[];
};
