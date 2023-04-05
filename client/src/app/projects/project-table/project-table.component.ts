import { Component, OnInit } from '@angular/core';
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
  projects?: Partial<any[]>;
  pageNumber = 0;
  pageSize = 5;
  pagination?: Pagination;
  selectedRowIds: Set<number> = new Set<number>();
  allChecked: boolean = false;

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
    this.loadProjects();
  }

  loadProjects() {
    const params: ProjectParams = this.projectService.getProjectParams();
    params.currentUsername = this.user?.username || undefined;

    this.projectService.getProjects(params).subscribe((response) => {
      if (response && response.pagination) {
        this.projects = response.result;
        this.pagination = response.pagination;
        this.pagination.currentPage = response.pagination.currentPage - 1;
      }
      this.projectService.resetProjectParams();
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
    console.log('### SELECT ALL');
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
}
