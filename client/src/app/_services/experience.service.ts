import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Member } from '../_models/member';
import { of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AccountService } from './account.service';
import { User } from '../_models/user';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';
import { ExperienceParams } from '../_models/experienceParams';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  baseUrl = environment.apiUrl;
  project?: any;
  user?: User;

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user: User | null) => {
        this.user = user as User;
      });
  }

  getExperiences(experienceParams?: ExperienceParams) {
    let params = getPaginationHeaders(1, 10);

    return getPaginatedResult<any[]>(
      this.baseUrl + 'experiences/' + this.user?.username,
      params,
      this.http
    ).pipe(
      map((response) => {
        return response;
      })
    );
  }
}