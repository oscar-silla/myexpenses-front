import { CategoryRequest } from './tansaction-category-request.type';

export type TransactionRequest = {
  amount: number;
  category: CategoryRequest;
  description: string;
  date: Date;
  type: string;
};
