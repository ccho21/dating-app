import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss'],
})
export class ProjectOverviewComponent implements OnInit {
  projects?: Partial<any[]>;
  pageNumber = 1;
  pageSize = 5;
  pagination?: Pagination;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService
      .getProjects({ pageNumber: this.pageNumber, pageSize: this.pageSize })
      .subscribe((response) => {
        if (response && response.pagination) {
          this.projects = response.result;
          console.log('### this.projects', this.projects);
          this.pagination = response.pagination;
          this.pagination.currentPage = response.pagination.currentPage - 1;
        }
      });
  }
}
