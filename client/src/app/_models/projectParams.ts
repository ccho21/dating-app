import { User } from './user';

export interface ProjectParams {
  pageNumber: number;
  pageSize: number;
  currentUsername?: string;
  orderBy?: string;
  keyword?: string;
  [key: string]: string | number | undefined;
}
