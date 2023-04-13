import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
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
  ProjectParams?: ProjectParams;

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user: User | null) => {
        this.user = user as User;
      });

    this.ProjectParams = new ProjectParams();
  }

  getProjectParams(): ProjectParams {
    return this.ProjectParams as ProjectParams;
  }

  setProjectParams(params: ProjectParams) {
    this.ProjectParams = params;
  }

  resetProjectParams() {
    this.ProjectParams = new ProjectParams();
    return this.ProjectParams;
  }

  getProjects(projectParams: ProjectParams) {
    let params = new HttpParams();

    Object.keys(projectParams).forEach((key: string) => {
      const value: string = projectParams.getValue(key);
      params = params.append(key, value);
    });

    console.log('###  parms', params);

    return getPaginatedResult<Project[]>(
      this.baseUrl + 'projects/',
      params,
      this.http
    ).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(this.baseUrl + 'projects/' + id).pipe(
      map((response) => {
        return response;
      })
    );
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.baseUrl}projects`, project).pipe(
      map((res: Project) => {
        if (this.projects) {
          const index = this.projects?.indexOf(project);
          this.projects[index] = project;
        }
        return res;
      })
    );
  }

  updateProject(project: Project, projectId: number) {
    return this.http
      .put<Project>(`${this.baseUrl}projects/${projectId}`, project)
      .pipe(
        map((res: Project) => {
          console.log('### what?', res);
          if (this.projects) {
            const index = this.projects?.indexOf(project);
            this.projects[index] = project;
          }
          return res;
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

// interface ProjectParams {
//   pageNumber: number;
//   pageSize: number;
//   minDate?: Date;
//   maxDate?: Date;
//   currentUsername?: string;
//   projectStatus?: string;
//   projectId?: number;
//   projectName?: string;
//   projectDescription?: string;
//   sort?: string;
//   isSortAscending?: boolean;
//   [key: string]: any;
// }
