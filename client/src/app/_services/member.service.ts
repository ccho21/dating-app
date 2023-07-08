import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Member, MemberForm } from '../_models/member';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserParams } from '../_models/userParams';
import { AccountService } from './account.service';
import { User } from '../_models/user';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  memberCache = new Map();
  user?: User;
  userParams?: UserParams;

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user: User | null) => {
        this.user = user as User;
        console.log('### ACCOUNT SERVICE', this.user);
        this.userParams = new UserParams(this.user);
      });
  }

  getUserParams() {
    return this.userParams;
  }

  setUserParams(params: UserParams) {
    this.userParams = params;
  }

  resetUserParams() {
    this.userParams = new UserParams(this.user as User);
    return this.userParams;
  }

  getMembers(userParams: UserParams) {
    // var response = this.memberCache.get(Object.values(userParams).join('-'));
    // if (response) {
    //   return of(response);
    // }
    // console.log(Object.values(userParams).join('-'), response);
    // console.log(this.memberCache);
    let params = new HttpParams();

    Object.keys(userParams).forEach((key: string) => {
      const value: string = userParams.getValue(key);
      params = params.append(key, value);
    });

    return getPaginatedResult<Member[]>(
      this.baseUrl + 'users',
      params,
      this.http
    ).pipe(
      map((response) => {
        this.memberCache.set(Object.values(userParams).join('-'), response);
        return response;
      })
    );
  }

  getUsersWithMessage(userParams: Partial<UserParams>) {
    // var response = this.memberCache.get(Object.values(userParams).join('-'));
    // console.log('### this.memberCache', this.memberCache);

    // if (response) {
    //   return of(response);
    // }

    let params = getPaginationHeaders(
      userParams.pageNumber as number,
      userParams.pageSize as number
    );

    return getPaginatedResult<Member[]>(
      `${this.baseUrl}users/with-message`,
      params,
      this.http
    ).pipe(
      map((response) => {
        this.memberCache.set(Object.values(userParams).join('-'), response);
        return response;
      })
    );
  }

  getMember(username: string) {
    const member = [...this.memberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((member: Member) => member.username === username);

    // if (member) {
    //   return of(member);
    // }
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: MemberForm): Observable<void> {
    return this.http.put<void>(this.baseUrl + 'users', member).pipe(
      map(() => {
        // const index = this.members.indexOf(member);
        // this.members[index] = member;
      })
    );
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }

  addLike(username: string) {
    return this.http.post(this.baseUrl + 'likes/' + username, {});
  }

  removeLike(username: string) {
    return this.http.delete(this.baseUrl + 'likes/' + username, {});
  }

  getLikes(predicate: string, pageNumber: number, pageSize: number) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    if (predicate) {
      params = params.append('predicate', predicate);
    }
    return getPaginatedResult<Partial<Member[]>>(
      this.baseUrl + 'likes',
      params,
      this.http
    );
  }
}
