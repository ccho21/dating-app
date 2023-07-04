import { Component, Input, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { ProjectParams } from 'src/app/_models/projectParams';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss'],
})
export class ProjectOverviewComponent implements OnInit {
  @Input() projects?: Partial<any[]>;
  pageNumber = 1;
  pageSize = 10;
  currentPage: number = 0;
  pagination?: Pagination;
  selectedRowIds: Set<number> = new Set<number>();
  allChecked: boolean = false;

  user?: User;

  @Input() member?: Member;
  loading: boolean = false;

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
    this.loading = true;
    const params: ProjectParams = this.projectService.getProjectParams();
    console.log('### NG ON INIT', params);

    if (this.projects) {
      this.loading = false;
    }
    // this.loadProjects(params);
  }

  loadProjects(params: ProjectParams) {
    this.loading = true;
    params.currentUsername = this.user?.username || undefined;

    this.projectService.getProjects(params).subscribe({
      next: (response) => {
        if (response && response.pagination) {
          console.log('### RESPONSE', response);
          this.projects = response.result;
          this.pagination = response.pagination;
        }
        this.projectService.resetProjectParams();
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  onRowClick(id: number) {
    if (this.selectedRowIds.has(id)) {
      this.selectedRowIds.delete(id);
    } else {
      this.selectedRowIds.add(id);
    }

    this.checkRows();
    this.allChecked = this.allRowsChecked();
    // console.log(this.getSelectedRows());
  }

  selectAll() {
    if (this.allChecked) {
      this.projects?.forEach((project) =>
        this.selectedRowIds.delete(project.id)
      );
    } else {
      this.projects?.forEach((project) => this.selectedRowIds.add(project.id));
    }
    this.checkRows();
  }

  rowIsSelected(id: number) {
    return this.selectedRowIds.has(id);
  }

  allRowsChecked(): boolean {
    if (this.selectedRowIds.size === this.projects?.length) {
      return true;
    } else {
      return false;
    }
  }
  checkRows() {
    this.projects = this.projects?.map((project) =>
      this.rowIsSelected(project.id)
        ? {
            ...project,
            isChecked: true,
          }
        : {
            ...project,
            isChecked: false,
          }
    );
  }

  getSelectedRows() {
    return this.projects?.filter((x) => this.selectedRowIds.has(x.id));
  }

  pageChanged(event: PageChangedEvent): void {
    if (this.pageNumber != event.page) {
      const params: ProjectParams = this.projectService.getProjectParams();
      params.pageNumber = event.page;
      this.loadProjects(params);
    }
  }
}
