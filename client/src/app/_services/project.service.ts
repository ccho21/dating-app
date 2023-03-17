import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Member } from '../_models/member';
import { of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserParams } from '../_models/userParams';
import { AccountService } from './account.service';
import { User } from '../_models/user';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';
import { ProjectParams } from '../_models/projectParams';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  baseUrl = environment.apiUrl;
  project?: any;

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {}

  getProjects(projectParams?: ProjectParams) {
    let params = getPaginationHeaders(1, 10);

    return getPaginatedResult<Member[]>(
      this.baseUrl + 'projects',
      params,
      this.http
    ).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
