import { User } from './user';

export interface ProjectParams {
  pageNumber: number;
  pageSize: number;
  currentUsername?: string | null;
}
