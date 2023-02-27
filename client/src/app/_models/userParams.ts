import { User } from './user';

export class UserParams {
    gender: string;
    minAge = 18;
    maxAge = 70;
    pageNumber = 0;
    pageSize = 10;
    orderBy = 'lastActive';

    constructor(user: User) {
        this.gender = user.gender === 'female' ? 'male' : 'female';
    }
}