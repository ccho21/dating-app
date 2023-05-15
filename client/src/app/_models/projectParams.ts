import { User } from './user';

// export interface ProjectParams {
//   pageNumber: number;
//   pageSize: number;
//   currentUsername?: string;
//   orderBy?: string;
//   keyword?: string;
//   [key: string]: string | number | undefined;
// }

export class ProjectParams {
  pageNumber: number = 0;
  pageSize: number = 10;
  currentUsername?: string;
  orderBy?: string;
  keyword?: string;
  company?: string;
  title?: string;
  minDate?: string;
  maxDate?: string;

  // constructor(user: User) {}
  public getValue(key: string): any {
    if (this.hasOwnProperty(key)) {
      return this[key as keyof ProjectParams];
    } else {
      throw new Error("Property doesn't exist for key: " + key);
    }
  }
}
