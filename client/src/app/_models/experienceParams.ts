import { User } from './user';

export class ExperienceParams {
  pageNumber = 1;
  pageSize = 10;
  currentUsername?: string;

  public getValue(key: string): any {
    if (this.hasOwnProperty(key)) {
      return this[key as keyof ExperienceParams];
    } else {
      throw new Error("Property doesn't exist for key: " + key);
    }
  }
}
