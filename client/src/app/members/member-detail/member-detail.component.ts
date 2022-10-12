import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Message } from 'src/app/_models/message';
import { MessageService } from 'src/app/_services/message.service';
import { PresenceService } from 'src/app/_services/presence.service';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_models/user';
import { take } from 'rxjs/operators';

import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss'],
})
export class MemberDetailComponent implements OnInit, OnDestroy {
  member: Member;
  galleryImages: any[];
  activeTab: number | null;
  messages: Message[] = [];
  user: User;

  constructor(
    public presence: PresenceService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private accountService: AccountService,
    private router: Router
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.member = data.member;
    });

    this.route.queryParams.subscribe((params) => {
      this.activeTab = params.tab ? Number(params.tab) : 0;
      this.selectTab({ index: this.activeTab } as MatTabChangeEvent);
    });

    this.galleryImages = this.getImages();
  }

  getImages(): any[] {
    const imageUrls = [];
    for (const photo of this.member.photos) {
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
      .getMessageThread(this.member.username)
      .subscribe((messages) => {
        this.messages = messages;
      });
  }

  selectTab(tab: MatTabChangeEvent) {
    if (tab.index === 3 && this.messages.length === 0) {
      this.messageService.createHubConnection(this.user, this.member.username);
    } else {
      this.messageService.stopHubConnection();
    }
  }
  detectTabChange(tab: MatTabChangeEvent) {}

  // onTabActivated(data: TabDirective) {
  //   console.log(data.heading);
  //   this.activeTab = data;
  //   if (this.activeTab.heading === 'Messages' && this.messages.length === 0) {
  //     this.messageService.createHubConnection(this.user, this.member.username);
  //   } else {
  //     this.messageService.stopHubConnection();
  //   }
  // }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }
}
