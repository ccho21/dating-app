import { Component, OnInit } from '@angular/core';
import { ExperienceParams } from 'src/app/_models/experienceParams';
import { Pagination } from 'src/app/_models/pagination';
import { ExperienceService } from 'src/app/_services/experience.service';

@Component({
  selector: 'app-experience-tab',
  templateUrl: './experience-tab.component.html',
  styleUrls: ['./experience-tab.component.scss'],
})
export class ExperienceTabComponent implements OnInit {
  experiences?: Partial<any[]>;
  pageNumber = 1;
  pageSize = 5;
  pagination?: Pagination;
  constructor(private experienceService: ExperienceService) {}

  ngOnInit(): void {
    const params: ExperienceParams =
      this.experienceService.getExperienceParams();

    console.log('### params', params);

    this.loadExperiences(params);
  }

  loadExperiences(params: ExperienceParams) {
    this.experienceService.getExperiences(params).subscribe({
      next: (response) => {
        console.log('### response', response);
        if (response && response.pagination) {
          this.experiences = response.result;
          this.pagination = response.pagination;
          this.pagination.currentPage = response.pagination.currentPage - 1;
        }
      },
    });
  }
}
