import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/_models/project';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-project-sm',
  templateUrl: './project-sm.component.html',
  styleUrls: ['./project-sm.component.scss'],
})
export class ProjectSmComponent implements OnInit {
  @Input() project?: Project;
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

  constructor() {}

  ngOnInit(): void {}
}
