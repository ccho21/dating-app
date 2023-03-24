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
import { Project } from '../_models/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  baseUrl = environment.apiUrl;
  projects?: Project[];
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

  getProjects(projectParams?: ProjectParams) {
    let params = getPaginationHeaders(1, 10);

    return getPaginatedResult<any[]>(
      this.baseUrl + 'projects/' + this.user?.username,
      params,
      this.http
    ).pipe(
      map((response) => {
        return response;
      })
    );
  }

  createProject(project: Project) {
    return this.http.post(`${this.baseUrl}projects`, project).pipe(
      map(() => {
        if (this.projects) {
          const index = this.projects?.indexOf(project);
          this.projects[index] = project;
        }
      })
    );
  }

  updateProject(project: Project, projectId: number) {
    return this.http.put(`${this.baseUrl}projects/${projectId}`, project).pipe(
      map(() => {
        if (this.projects) {
          const index = this.projects?.indexOf(project);
          this.projects[index] = project;
        }
      })
    );
  }

  deleteProject(projectId: number) {
    return this.http.delete(this.baseUrl + 'projects/' + projectId);
  }

  deletePhoto(projectId: number, photoId: number) {
    return this.http.delete(
      this.baseUrl + 'projects/' + projectId + '/delete-photo/' + photoId
    );
  }
}
