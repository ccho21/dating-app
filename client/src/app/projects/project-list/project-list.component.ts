import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PaginatedResult } from '../../_models/pagination';
import { Project } from '../../_models/project';
import { ProjectParams } from '../../_models/projectParams';
import { ProjectService } from '../../_services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.getProjects();
  }

  private getProjects(): void {
    const params: ProjectParams = this.projectService.getProjectParams();
    this.projectService.getProjects(params).subscribe((res) => {
      this.projects = res.result as Project[];
    });
  }
}
