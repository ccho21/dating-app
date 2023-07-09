import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/_models/project';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-project-card-one',
  templateUrl: './project-card-one.component.html',
  styleUrls: ['./project-card-one.component.scss'],
})
export class ProjectCardOneComponent implements OnInit {
  @Input() project?: Project;
  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: false,
    pagination: { clickable: true, dynamicBullets: true },
    scrollbar: { draggable: true },
  };

  constructor() {}

  ngOnInit(): void {}
}
