import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import SwiperCore, { Pagination, Navigation, SwiperOptions } from 'swiper';
SwiperCore.use([Navigation, Pagination]);

import {
  Gallery,
  GalleryItem,
  ThumbnailsPosition,
  ImageSize,
} from 'ng-gallery';

@Component({
  selector: 'app-about-tab',
  templateUrl: './about-tab.component.html',
  styleUrls: ['./about-tab.component.scss'],
})
export class AboutTabComponent implements OnInit {
  @Input() member?: Member;

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: false,
    pagination: { clickable: true, dynamicBullets: true },
    scrollbar: { draggable: true },
  };

  //
  items: GalleryItem[] = [];

  //

  constructor(public gallery: Gallery) {}

  ngOnInit(): void {
    const lightboxRef = this.gallery.ref('lightbox');

    // Add custom gallery config to the lightbox (optional)
    lightboxRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top,
    });

    // Load items into the lightbox gallery ref
    lightboxRef.load(this.items);
  }
}
