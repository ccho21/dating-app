import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subscription, take } from 'rxjs';
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
  selector: 'app-message-members',
  templateUrl: './message-members.component.html',
  styleUrls: ['./message-members.component.scss'],
})
export class MessageMembersComponent implements OnInit {
  messages?: Message[] = [];
  members?: Member[];
  pagination?: Pagination;
  container = 'Inbox';
  pageNumber = 1;
  pageSize = 10;
  loading = false;

  user?: User;
  newMessageThread$?: Subscription;
  messageThread$?: Subscription;
  user$?: Subscription;
  member?: Member;
  constructor(
    private accountService: AccountService,
    private memberService: MemberService,

    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.user$ = this.accountService.currentUser$.subscribe((res) => {
      this.user = res!;
      if (this.user) {
        this.loadUsers();
      }
    });

    this.messageService.sendMember$.subscribe((member: Member | null) => {
      if (member) {
        console.log('######### MEMBER!!!', member);
        const i = this.members?.findIndex((x) => x.id === member.id) || 0;
        if (i < 0) {
          this.members?.unshift(member);
        }
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
            const messageSent = member.messagesSent.filter(
              (m) => m.recipientUsername === this.user?.username
            );
            return {
              ...member,
              messagesSent: messageSent,
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
