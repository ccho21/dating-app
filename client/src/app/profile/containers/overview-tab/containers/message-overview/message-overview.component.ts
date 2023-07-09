import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/message';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { MemberService } from 'src/app/_services/member.service';
import { MessageService } from 'src/app/_services/message.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-message-overview',
  templateUrl: './message-overview.component.html',
  styleUrls: ['./message-overview.component.scss'],
})
export class MessageOverviewComponent implements OnInit, OnDestroy {
  messages?: Message[] = [];
  members?: Member[];
  pagination?: Pagination;
  container = 'Inbox';
  pageNumber = 1;
  pageSize = 10;
  loading = false;

  user?: User;
  member?: Member;
  user$?: Subscription;
  constructor(
    private messageService: MessageService,
    private accountService: AccountService,
    private memberService: MemberService,
    private confirmService: ConfirmService,
    private presenceService: PresenceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user$ = this.accountService.currentUser$.subscribe((res) => {
      this.user = res!;
      if (this.user) {
        this.loadUsers();
      }
    });
  }

  loadUsers() {
    this.loading = true;
    const userParams: Partial<UserParams> = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    };
    console.log('## users? IN OVERVIEW!!!!!!!!!!!!!!!!!', userParams);

    this.memberService
      .getUsersWithMessage(userParams)
      .pipe(
        map((res) => {
          let { result } = res;
          const updated = result?.map((member: Member) => {
            const recentMessages = member.recentMessages.filter(
              (m) => m.recipientUsername === this.user?.username
            );
            return {
              ...member,
              messagesSent: recentMessages,
            };
          });

          res.result = updated;
          return res;
        })
      )
      .subscribe({
        next: (response) => {
          console.log('### THIS LOAD USERS RESPONSE', response);
          if (response && response.pagination) {
            this.members = response.result;
            this.pagination = response.pagination;
            if (this.pagination) {
              this.pagination.currentPage = response.pagination.currentPage - 1;
            }
          }
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  private resetData() {
    this.member = undefined;
    this.members = [];

    this.messages = [];
    this.user = undefined;
    if (this.user$) {
      this.user$.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    console.log('### Ng destroy in message overview');
    this.resetData();
  }
}
