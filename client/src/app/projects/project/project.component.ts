import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
    this.route.params.subscribe((params) => {
      const projectId = parseInt(params['id'], 10);

      if (!isNaN(projectId)) {
        this.project$ = this.projectService.getProject(projectId);
      } else {
        this.router.navigate(['main', 'projects']);
      }
    });

    const lightboxRef = this.gallery.ref('lightbox');

    // Add custom gallery config to the lightbox (optional)
    lightboxRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top,
    });

    // Load items into the lightbox gallery ref
    lightboxRef.load(this.items);
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
