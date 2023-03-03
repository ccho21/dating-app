import { ViewportScroller } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Subscription, take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/message';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.scss'],
})
export class MemberMessagesComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('messageBody') messageBody?: ElementRef<HTMLDivElement>;
  @ViewChild('messageForm') messageForm?: NgForm;
  @Input() messages?: Message[];
  @Input() member?: Member;
  @Output() messageClose = new EventEmitter();
  messageContent?: string;
  loading = false;
  user?: User;

  messageThread$?: Subscription;
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

  constructor(
    public messageService: MessageService,
    private accountService: AccountService,
    private scroller: ViewportScroller
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user as User));
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.user && this.member) this.selectTab();
  }

  ngAfterViewInit() {
    const maxScroll = this.messageBody?.nativeElement.scrollHeight;
    console.log('### maxScroll', maxScroll);
    this.messageBody?.nativeElement.scrollTo({
      top: maxScroll,
      behavior: 'smooth',
    });
  }

  ngOnInit(): void {
    this.messageThread$ = this.messageService.messageThread$.subscribe(
      (res) => {
        console.log('### Check Message Thread$', res);
      }
    );
  }

  selectTab() {
    if (!this.messages || this.messages?.length === 0) {
      console.log('### start', this.messages);

      this.messageService.createHubConnection(
        this.user as User,
        this.member?.username as string
      );
    } else {
      console.log('### stop', this.messages);
      this.messageService.stopHubConnection();
    }
  }

  sendMessage() {
    this.loading = true;
    console.log(this.messageContent);
    this.messageService
      .sendMessage(
        this.member?.username as string,
        this.messageContent as string
      )
      .then(() => {
        this.messageForm?.reset();
      })
      .finally(() => (this.loading = false));
  }

  resetMessageService() {
    this.messageThread$!.unsubscribe();
    this.messageService.stopHubConnection();
  }

  close() {
    console.log('### emit the close ');
    this.resetMessageService();
    this.messageClose.emit(false);
  }

  ngOnDestroy(): void {
    console.log('### Member message is destroyed');
    this.resetMessageService();
  }
}

export interface Section {
  name: string;
  updated: Date;
}
