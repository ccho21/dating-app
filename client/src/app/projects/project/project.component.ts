import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/_models/project';
import SwiperCore, { Pagination, Navigation, SwiperOptions } from 'swiper';
SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  @Input() project?: Project;
  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
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

  constructor() {}

  ngOnInit(): void {
    console.log('### projectng init', this.project);
  }
}
