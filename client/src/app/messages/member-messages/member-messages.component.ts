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
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take, tap } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/message';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MemberService } from 'src/app/_services/member.service';
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
  @Output() messageClose = new EventEmitter();
  messageContent?: string;
  loading = false;
  user?: User;
  member?: Member;

  membername?: string;

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
    private scroller: ViewportScroller,
    private route: ActivatedRoute,
    private router: Router,
    private memberService: MemberService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {}

  // ngAfterViewInit() {
  //   const maxScroll = this.messageBody?.nativeElement.scrollHeight;
  //   console.log('### maxScroll', maxScroll);
  //   this.messageBody?.nativeElement.scrollTo({
  //     top: maxScroll,
  //     behavior: 'smooth',
  //   });
  // }

  ngOnInit(): void {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user: User | null) => {
        if (user) {
          this.user = user;
          console.log('### ACCOUNT SERVICE', this.user);
        }
      });

    console.log('### MEMBER MESSAGE STARTED');
    this.messageThread$ = this.messageService.messageThread$.subscribe(
      (res) => {
        console.log('### Check Message Thread$', res);
      }
    );

    this.route.params.subscribe(({ membername }) => {
      this.membername = membername;

      this.memberService.getMember(membername).subscribe((member) => {
        console.log('### MEMBEr', member);
        console.log('### User', this.user);
        this.member = member;
        if (this.user && this.member) this.selectTab();
      });
    });
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
    if (this.messageContent)
      this.messageService
        .sendMessage(
          this.member?.username as string,
          this.messageContent as string
        )
        .then(() => {
          this.messageForm?.reset();
        })
        .finally(() => (this.loading = false));
    else alert('please enter message');
  }

  resetMessageService() {
    this.messageThread$!.unsubscribe();
    this.messageService.stopHubConnection();
  }

  close() {
    console.log('### emit the close ');
    this.resetMessageService();
    this.router.navigate(['/main/messages']);
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
