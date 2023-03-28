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
  selectedRowIds: Set<number> = new Set<number>();
  allChecked: boolean = false;

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
          this.pagination = response.pagination;
          this.pagination.currentPage = response.pagination.currentPage - 1;
        }
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
