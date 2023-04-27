import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AccountService } from './account.service';
import { Skill } from '../_models/skill';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {}

  getSkills(): Observable<Skill[]> {
    return this.http
      .get<Skill[]>(`${this.baseUrl}skills`)
      .pipe(map((response) => response));
  }

  createSkill(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(`${this.baseUrl}skills`, skill).pipe(
      map((res: Skill) => {
        return res;
      })
    );
  }
}
