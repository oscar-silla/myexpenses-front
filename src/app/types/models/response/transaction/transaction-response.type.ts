import { CategoryResponse } from '../category/category-response.type';

export type TransactionResponse = {
  id: number;
  date: Date;
  amount: number;
  category: CategoryResponse;
  description: string;
};
