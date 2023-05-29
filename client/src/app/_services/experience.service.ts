import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Member } from '../_models/member';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AccountService } from './account.service';
import { User } from '../_models/user';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';
import { ExperienceParams } from '../_models/experienceParams';
import { Experience } from '../_models/experience';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  baseUrl = environment.apiUrl;
  project?: any;
  user?: User;
  experienceParams?: ExperienceParams;

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user: User | null) => {
        this.user = user as User;
      });

    this.experienceParams = new ExperienceParams();
  }

  getExperiences(experienceParams: ExperienceParams) {
    let params = new HttpParams();

    console.log('###params', experienceParams);
    Object.keys(experienceParams).forEach((key: string) => {
      const value: string = experienceParams.getValue(key);
      params = params.append(key, value);
    });

    return getPaginatedResult<any[]>(
      this.baseUrl + 'experiences/',
      params,
      this.http
    ).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getExperience(id: number): Observable<Experience> {
    return this.http.get<Experience>(this.baseUrl + 'experiences/' + id).pipe(
      map((response) => {
        return response;
      })
    );
  }

  createExperience(experience: Experience) {
    return this.http
      .post<Experience>(`${this.baseUrl}experiences`, experience)
      .pipe(
        map((res: Experience) => {
          console.log('### update experience?', res);
          // TODO: NGRX
          // if (this.experiences) {
          //   const index = this.experiences?.indexOf(experience);
          //   this.experiences[index] = experience;
          // }
          return res;
        })
      );
  }

  updateExperience(experience: Experience, experienceId: number) {
    return this.http
      .put<Experience>(`${this.baseUrl}experiences/${experienceId}`, experience)
      .pipe(
        map((res: Experience) => {
          console.log('### update experience?', res);
          // TODO: NGRX
          // if (this.experiences) {
          //   const index = this.experiences?.indexOf(experience);
          //   this.experiences[index] = experience;
          // }
          return res;
        })
      );
  }

  deletePhoto(experienceId: number, photoId: number) {
    return this.http.delete(
      this.baseUrl + 'experiences/' + experienceId + '/delete-photo/' + photoId
    );
  }

  getExperienceParams(): ExperienceParams {
    return this.experienceParams as ExperienceParams;
  }

  setExperienceParams(params: ExperienceParams) {
    this.experienceParams = params;
  }

  resetExperienceParams() {
    this.experienceParams = new ExperienceParams();
    return this.experienceParams;
  }
}
