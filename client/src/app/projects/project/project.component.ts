import { Component, Input, OnInit } from '@angular/core';
import SwiperCore, { Pagination, Navigation, SwiperOptions } from 'swiper';
SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  @Input() project?: any;
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

  ngOnInit(): void {}
}
