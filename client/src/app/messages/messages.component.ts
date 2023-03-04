import { Component, OnDestroy, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { Pagination } from '../_models/pagination';
import { ConfirmService } from '../_services/confirm.service';
import { MessageService } from '../_services/message.service';
import Driver from 'driver.js';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MembersService } from '../_services/members.service';
import { UserParams } from '../_models/userParams';
import { Member } from '../_models/member';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { Subscription } from 'rxjs';
import { PresenceService } from '../_services/presence.service';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit, OnDestroy {
  messages?: Message[] = [];
  members?: Member[];
  pagination?: Pagination;
  container = 'Inbox';
  pageNumber = 1;
  pageSize = 20;
  loading = false;

  user?: User;
  member?: Member;
  newMessageThread$?: Subscription;
  messageThread$?: Subscription;
  //
  driver?: Driver;

  columns: string[] = [
    'senderUsername',
    'recipientUsername',
    'content',
    'messageSent',
  ];
  displayedColumns: Array<string> = [];

  folders: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
  ];
  notes: Section[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    },
  ];
  //

  constructor(
    private messageService: MessageService,
    private accountService: AccountService,
    private memberService: MembersService,
    private confirmService: ConfirmService,
    private presenceService: PresenceService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe((res) => {
      this.user = res!;
    });
    // this.loadMessages();

    this.loadUsers();
    // this.startNavigationGuide();

    this.newMessageThread$ = this.presenceService.newMessage$.subscribe(
      (res: Message) => {
        console.log('### New Message Came$', res);
        const index = this.members?.findIndex(
          (member) => member.username === res.senderUsername
        ) as number;

        console.log('### INDEX', index);
        console.log('### this.members', this.members);
        if (index > -1 && this.members && this.members.length) {
          const messages = this.members[index!].messagesSent;
          this.members[index!].messagesSent = [...messages, res];
          console.log('### this memeber!', this.members[index!]);
        } else {
          console.log('### THIS LOAD USERS', this.members);
          setTimeout(() => {
            this.loadUsers();
          }, 1000);
        }
      }
    );

    this.messageThread$ = this.messageService.messageThread$.subscribe(
      (res) => {
        console.log('### Check Message Thread$', res);
        console.log('### this.member!!', this.member);
        if (this.member) {
          this.member.messagesSent = res;
        }
      }
    );
  }

  loadUsers() {
    this.loading = true;
    const userParams: Partial<UserParams> = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    };

    this.memberService.getUsersWithMessage(userParams).subscribe((response) => {
      console.log('### THIS LOAD USERS RESPONSE', response);
      if (response && response.pagination) {
        this.members = response.result;
        this.pagination = response.pagination;
        if (this.pagination) {
          this.pagination.currentPage = response.pagination.currentPage - 1;
        }
        this.loading = false;
      }
    });
  }

  loadMessages() {
    this.handleColumns();

    this.loading = true;
    this.messageService
      .getMessages(this.pageNumber, this.pageSize, this.container)
      .subscribe((response) => {
        console.log('### response', response);
        if (response && response.pagination) {
          this.messages = response.result;
          this.pagination = response.pagination;
          if (this.pagination) {
            this.pagination.currentPage = response.pagination.currentPage - 1;
          }
          this.loading = false;
        }
      });
  }

  handleColumns() {
    console.log('### container', this.container);

    if (this.container === 'Outbox') {
      this.displayedColumns = this.columns.filter(
        (column) => column !== 'senderUsername'
      );
    } else {
      this.displayedColumns = this.columns.filter(
        (column) => column !== 'recipientUsername'
      );
    }
  }

  deleteMessage(id: number) {
    this.confirmService
      .confirm('Confirm delete message', 'This cannot be undone')
      .subscribe((result) => {
        if (result) {
          this.messageService.deleteMessage(id).subscribe(() => {
            this.messages?.splice(
              this.messages.findIndex((m) => m.id === id),
              1
            );
          });
        }
      });
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.pageIndex + 1;
      this.pageSize = event.pageSize;
      this.loadMessages();
    }
  }

  startNavigationGuide() {
    if (!this.driver) {
      this.driver = new Driver({
        animate: true,
        keyboardControl: true,
      });

      const steps = [
        {
          element: '#login-step3',
          popover: {
            title: 'Messages',
            description:
              'Message box that allows you to communicate with other members!',
            position: 'bottom-center',
          },
        },
      ];
      console.log('### this driver', steps);
      this.driver.defineSteps(steps);
      this.driver.start();
    }
  }

  resetNavigationGuide() {
    if (this.driver) {
      this.driver.reset();
      this.driver = undefined;
    }
  }

  notReadMessages(messages: Message[]) {
    return messages && messages.length
      ? messages.filter((message) => message.dateRead === null).length
      : 0;
  }

  openMemberDetail(member: Member) {
    this.member = null!;
    setTimeout(() => {
      if (member) {
        this.member = member;
      }
    }, 300);
  }

  closeMessage(e: boolean) {
    // this.messageOpen = e;
    this.member = null!;
  }

  resetMessageService() {
    this.members = [];
    this.newMessageThread$!.unsubscribe();
  }

  ngOnDestroy(): void {
    console.log('### Member message is destroyed');
    this.resetMessageService();
  }
}
