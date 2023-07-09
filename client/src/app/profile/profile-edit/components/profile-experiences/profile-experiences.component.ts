import { Component, OnInit } from '@angular/core';
import { ExperienceParams } from 'src/app/_models/experienceParams';
import { Pagination } from 'src/app/_models/pagination';
import { ExperienceService } from 'src/app/_services/experience.service';

@Component({
  selector: 'app-profile-experiences',
  templateUrl: './profile-experiences.component.html',
  styleUrls: ['./profile-experiences.component.scss'],
})
export class ProfileExperiencesComponent implements OnInit {
  experiences?: Partial<any[]>;
  pageNumber = 1;
  pageSize = 5;
  pagination?: Pagination;
  loading?: boolean;
  btns?: Array<any>;
  constructor(private experienceService: ExperienceService) {}

  ngOnInit(): void {
    this.btns = [
      {
        btnLabel: 'Add Experience',
        btnLink: '/main/dashboard/experiences/create',
        customClass: '',
      },
    ];
    const params: ExperienceParams =
      this.experienceService.getExperienceParams();

    console.log('### params', params);

    this.loadExperiences(params);
  }

  loadExperiences(params: ExperienceParams) {
    this.loading = true;

    this.experienceService.getExperiences(params).subscribe({
      next: (response) => {
        if (response && response.pagination) {
          this.experiences = response.result;
          this.pagination = response.pagination;
          this.pagination.currentPage = response.pagination.currentPage - 1;
        }
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
