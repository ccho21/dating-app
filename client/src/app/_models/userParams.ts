import { User } from './user';

export class UserParams {
  gender = 'all';
  minAge = 0;
  maxAge = 99;
  pageNumber = 0;
  pageSize = 10;
  orderBy = 'lastActive';

  constructor(user: User) {
    // this.gender = user.gender === 'female' ? 'male' : 'female';
  }
}
