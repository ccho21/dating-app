import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Project } from '../../../_models/project';
import { ProjectParams } from '../../../_models/projectParams';
import { ProjectService } from '../../../_services/project.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit, OnDestroy {
  projects: Project[] = [];
  loading: boolean = false;

  constructor(
    private projectService: ProjectService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getProjects();
  }

  private getProjects(): void {
    this.loading = true;
    const params: ProjectParams = this.projectService.getProjectParams();
    this.projectService.getProjects(params).subscribe({
      next: (res) => {
        this.projects = res.result as Project[];
      },
      complete: () => {
        this.loading = false;
      },
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
