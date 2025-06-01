import { CategoryResponse } from './category-response.type';
import { PaginationResponse } from '../pagination/pagination-response.type';

export type CategoriesResponse = {
  results: CategoryResponse[];
  pagination: PaginationResponse;
};
