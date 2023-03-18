import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/_models/pagination';
import { ExperienceService } from 'src/app/_services/experience.service';

@Component({
  selector: 'app-experience-list',
  templateUrl: './experience-list.component.html',
  styleUrls: ['./experience-list.component.scss'],
})
export class ExperienceListComponent implements OnInit {
  experiences?: Partial<any[]>;
  pageNumber = 1;
  pageSize = 5;
  pagination?: Pagination;
  constructor(private experienceService: ExperienceService) {}

  ngOnInit(): void {
    this.loadExperiences();
  }

  loadExperiences() {
    this.experienceService
      .getExperiences({ pageNumber: this.pageNumber, pageSize: this.pageSize })
      .subscribe((response) => {
        if (response && response.pagination) {
          this.experiences = response.result;
          this.pagination = response.pagination;
          this.pagination.currentPage = response.pagination.currentPage - 1;
        }
      });
  }
}
