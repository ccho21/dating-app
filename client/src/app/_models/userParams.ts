import { User } from './user';

export class UserParams {
  gender: string = 'all';
  minAge: number = 0;
  maxAge: number = 99;
  pageNumber: number = 0;
  pageSize: number = 10;
  username?: string;
  orderBy?: string;

  constructor(user?: User) {
    if (user) {
      // this.gender = user.gender === 'female' ? 'male' : 'female';
    }
  }

  public getValue(key: string): any {
    if (this.hasOwnProperty(key)) {
      return this[key as keyof UserParams];
    } else {
      throw new Error("Property doesn't exist for key: " + key);
    }
  }
}
