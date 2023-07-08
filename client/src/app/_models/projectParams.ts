export class ProjectParams {
  pageNumber: number = 1;
  pageSize: number = 1;
  currentUsername?: string;
  orderBy?: string;
  keyword?: string;
  company?: string;
  title?: string;
  minDate?: string;
  maxDate?: string;

  public getValue(key: string): any {
    if (this.hasOwnProperty(key)) {
      return this[key as keyof ProjectParams];
    } else {
      throw new Error("Property doesn't exist for key: " + key);
    }
  }
}
