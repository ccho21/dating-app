import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from 'src/app/_models/project';
import { ProjectService } from 'src/app/_services/project.service';
import SwiperCore, { Pagination, Navigation, SwiperOptions } from 'swiper';
SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  project?: Project;

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: false,
    pagination: { clickable: true, dynamicBullets: true },
    scrollbar: { draggable: true },
    // [pagination]="{

    //   clickable: true
    // }"
    // [slidesPerView]="1"
    // [spaceBetween]="50"
  };

  member = {
    photos: [
      {
        url: './assets/shared/home-background-1.jpg',
      },
      {
        url: './assets/shared/home-background-2.jpg',
      },
      {
        url: './assets/shared/home-background-3.jpg',
      },
    ],
  };

  project$?: Observable<Project>;
  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    const projectId = parseInt(this.route.snapshot.params['id'], 10);
    if (!isNaN(projectId)) {
      this.project$ = this.projectService.getProject(projectId);
    } else {
      this.router.navigate(['main', 'projects']);
    }
  }
  private getProject(id: number): void {
    this.projectService.getProject(id).subscribe((project) => {
      this.project = project;
    });
  }

  goBack() {
    this.location.back();
  }
}
