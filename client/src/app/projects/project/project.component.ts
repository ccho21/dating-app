import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { Project } from 'src/app/_models/project';
import { ProjectService } from 'src/app/_services/project.service';
import SwiperCore, { Pagination, Navigation, SwiperOptions } from 'swiper';
SwiperCore.use([Navigation, Pagination]);

import {
  Gallery,
  GalleryItem,
  ThumbnailsPosition,
  ImageSize,
} from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { Photo } from 'src/app/_models/photo';
import { ProjectParams } from 'src/app/_models/projectParams';
import { PaginatedResult } from 'src/app/_models/pagination';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  project?: Project;
  otherProjects?: Project[];

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: false,
    pagination: { clickable: true, dynamicBullets: true },
    scrollbar: { draggable: true },
  };

  project$?: Observable<Project>;
  //
  items: GalleryItem[] = [];

  //

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public gallery: Gallery
  ) {}

  ngOnInit(): void {
    const lightboxRef = this.gallery.ref('lightbox');

    // Add custom gallery config to the lightbox (optional)
    lightboxRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top,
    });

    // Load items into the lightbox gallery ref
    lightboxRef.load(this.items);

    this.route.params.subscribe((params) => {
      const projectId = parseInt(params['id'], 10);

      if (!isNaN(projectId)) {
        this.projectService
          .getProject(projectId)
          .pipe(
            concatMap((project: Project) => {
              this.project = project;
              const { user } = project;
              const params: ProjectParams = {
                pageSize: 10,
                pageNumber: 0,
              };

              params.currentUsername = user.username;
              return this.projectService.getProjects(params);
            })
          )
          .subscribe((res: PaginatedResult<Project[]>) => {
            this.otherProjects = res.result;
          });
      } else {
        this.router.navigate(['main', 'projects']);
      }
    });
  }

  getGalerryPhotos() {
    return this.project?.images?.map((photo: Photo) => ({
      id: photo.id,
      srcUrl: photo.url,
      previewUrl: photo.url,
    }));
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
