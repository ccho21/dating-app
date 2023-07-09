import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Pagination } from 'src/app/_models/pagination';
import { ProjectParams } from 'src/app/_models/projectParams';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.scss'],
})
export class ProjectTableComponent implements OnInit {
  @Input() projects?: Partial<any[]>;
  @Input() pagination?: Pagination;

  @Output() paramsEmit = new EventEmitter<ProjectParams>();
  currentPage: number = 0;

  user?: User;
  constructor(
    private projectService: ProjectService,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$.subscribe((user: User | null) => {
      if (user) {
        this.user = user;
      }
    });
  }

  ngOnInit(): void {
 
  }

  loadProjects(params: ProjectParams) {
    params.currentUsername = this.user?.username || undefined;

    this.projectService.getProjects(params).subscribe((response) => {
      if (response && response.pagination) {
        console.log('### RESPONSE', response);
        this.projects = response.result;
        this.pagination = response.pagination;
      }
      this.projectService.resetProjectParams();
    });
  }

  pageChanged(event: PageChangedEvent): void {
    if (this.pagination?.currentPage != event.page) {
      const params: ProjectParams = this.projectService.getProjectParams();
      params.pageNumber = event.page;
      this.paramsEmit.emit(params);
    }
  }
}
