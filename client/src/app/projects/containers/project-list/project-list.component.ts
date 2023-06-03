import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Project } from '../../../_models/project';
import { ProjectParams } from '../../../_models/projectParams';
import { ProjectService } from '../../../_services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit, OnDestroy {
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

  search(params: ProjectParams) {
    console.log('### CAME HERE?', params);
    this.projectService.getProjects(params).subscribe((res) => {
      console.log('### working?', res);
      this.projects = res.result as Project[];
    });
  }

  ngOnDestroy(): void {
    console.log('### project list destroyed');
  }
}
