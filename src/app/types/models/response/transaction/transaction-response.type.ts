import { CategoryResponse } from '../category/category-response.type';

export type TransactionResponse = {
  id: number;
  type: string;
  date: Date;
  amount: number;
  category: CategoryResponse;
  description: string;
};
