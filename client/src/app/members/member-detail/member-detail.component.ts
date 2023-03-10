import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MemberService } from 'src/app/_services/member.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Message } from 'src/app/_models/message';
import { MessageService } from 'src/app/_services/message.service';
import { PresenceService } from 'src/app/_services/presence.service';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_models/user';
import { take } from 'rxjs/operators';

import { MatTabChangeEvent } from '@angular/material/tabs';
// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from 'swiper';
import { Photo } from 'src/app/_models/photo';
// install Swiper modules
SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss'],
})
export class MemberDetailComponent implements OnInit, OnDestroy {
  member?: Member;
  galleryImages?: any[];
  activeTab?: number;
  messages?: Message[] = [];
  user?: User;

  // config: SwiperOptions = {
  //   slidesPerView: 1,
  //   spaceBetween: 50,
  //   navigation: true,
  //   pagination: { clickable: true },
  //   scrollbar: { draggable: true },
  // };

  constructor(
    public presence: PresenceService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private accountService: AccountService,
    private router: Router
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user as User));
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.member = data['member'];
    });

    this.route.queryParams.subscribe((params) => {
      if (params) {
        this.activeTab = params['tab'] ? Number(params['tab']) : 0;
        // this.selectTab({ index: this.activeTab } as MatTabChangeEvent);
      }
    });

    this.galleryImages = this.getImages();
  }

  getImages(): any[] {
    const imageUrls = [];
    for (const photo of this.member?.photos as Photo[]) {
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url,
      });
    }
    return imageUrls;
  }

  loadMessages() {
    this.messageService
      .getMessageThread(this.member?.username as string)
      .subscribe((messages) => {
        this.messages = messages;
      });
  }

  selectTab(tab: MatTabChangeEvent) {
    console.log('### tab', tab);
    this.activeTab = tab.index;
  }

  detectTabChange(tab: MatTabChangeEvent) {}


  ngOnDestroy(): void {
    console.log('#################MEMBER DETAIL DESTROYED');
    this.messageService.stopHubConnection();
  }
}
