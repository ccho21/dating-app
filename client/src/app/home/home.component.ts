import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { MemberService } from '../_services/member.service';
import { UserParams } from '../_models/userParams';
import { User } from '../_models/user';
import { Member } from '../_models/member';
import { Pagination } from '../_models/pagination';
import { concatMap, of } from 'rxjs';
import { ViewportScroller } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { PresenceService } from '../_services/presence.service';

import { TooltipConfig } from 'ngx-bootstrap/tooltip';
export function getAlertConfig(): TooltipConfig {
  return Object.assign(new TooltipConfig(), {
    placement: 'right',
    container: 'body',
    delay: 500
  });
}


const enterTransition = transition(':enter', [
  style({
    opacity: 0,
  }),
  animate('.3s ease-in', style({ opacity: 1 })),
]);

const fadeIn = trigger('fadeIn', [enterTransition]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeIn],
})
export class HomeComponent implements OnInit {
  registerMode = false;

  members?: Member[];
  member?: Member;
  pagination?: Pagination;
  userParams?: UserParams;
  user?: User;

  genderList = [
    { value: 'male', display: 'Males' },
    { value: 'female', display: 'Females' },
  ];

  imageUrls = [
    'home-background-1.jpg',
    'home-background-2.jpg',
    'home-background-3.jpg',
  ];

  messageOpen: boolean = false;

  constructor(
    public dialog: MatDialog,
    public accountService: AccountService,
    private router: Router,
    private memberService: MemberService,
    private scroller: ViewportScroller,
    public presence: PresenceService
  ) {}

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe((res) => {
      this.user = res!;
      if (this.user) {
        this.router.navigate(['main']);
      }
    });

    
  }

  // selectTab() {
  //   if (this.user && this.member) {
  //     this.messageService.createHubConnection(
  //       this.user as User,
  //       this.member?.username as string
  //     );
  //   } else {
  //     this.messageService.stopHubConnection();
  //   }
  // }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }

  loadMembers(userParams?: UserParams) {
    console.log('### use rParams', userParams);
    if (userParams && this.user) {
      this.userParams = userParams;
      this.memberService.setUserParams(this.userParams);

      this.memberService
        .getMembers(this.userParams as UserParams)
        .subscribe((response) => {
          if (response) {
            console.log('### RESPONSE', response);
            this.members = response.result;
            this.pagination = response.pagination;

            // if (this.pagination) {
            //   this.pagination.currentPage = response.pagination.currentPage - 1;
            // }
          }
        });
    } else {
      // alert('Please LOGIN FIRST!');
    }
  }

  openMemberDetail(member: Member) {
    this.member = undefined;
    this.messageOpen = false;
    if (member) {
      this.member = member;
    }

    this.scroller.scrollToAnchor('member-detail');
  }

  openMessage(member: Member) {
    this.messageOpen = true;
  }
  closeMessage(e: boolean) {
    this.messageOpen = e;
  }
}
