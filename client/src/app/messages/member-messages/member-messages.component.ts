import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
export class MemberMessagesComponent implements OnInit, OnDestroy {
  @ViewChild('messageBody') messageBody?: ElementRef<HTMLDivElement>;
  @ViewChild('messageForm') messageForm?: NgForm;
  @Output() messageClose = new EventEmitter();
  messageContent?: string;
  loading = false;
  user?: User;
  userSub$?: Subscription;

  member?: Member;

  messages?: Message[];
  messageThread$?: Subscription;
  destroyMessage$?: Subscription;

  constructor(
    public messageService: MessageService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private memberService: MemberService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('### hello');
    this.loading = true;

    this.route.params.subscribe(({ membername }) => {
      this.memberService.getMember(membername).subscribe({
        next: (member) => {
          this.member = member;
          this.messageService.setSendMemberSource(this.member);
          if (this.user && this.member) this.checkConnection();
        },
        complete: () => {
          this.loading = false;
        },
      });
    });

    this.getCurrentUser();
    this.getMessageThread();
  }

  getMessageThread() {
    this.messageThread$ = this.messageService.messageThread$.subscribe({
      next: (res) => {
        console.log('## messageThread?', res);

        this.messages = res;
        this.ref.detectChanges();
        this.loading = false;
      },
      complete: () => {
        console.log('## working?');
      },
    });
  }

  getCurrentUser() {
    this.userSub$ = this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user: User | null) => {
        if (user) {
          this.user = user;
        }
      },
      complete: () => {},
    });
  }

  checkConnection() {
    if (!this.messages || this.messages?.length === 0) {
      this.messageService.createHubConnection(
        this.user as User,
        this.member?.username as string
      );
    } else {
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
    console.log('### resetMessageService COMPONENT DESTROY!');
    this.member = undefined;
    this.messageThread$!.unsubscribe();
    this.messageService.stopHubConnection();
    this.userSub$!.unsubscribe();
  }

  close() {
    this.resetMessageService();
    this.router.navigate(['/main/messages']);
  }

  ngOnDestroy(): void {
    this.resetMessageService();
  }
}

export interface Section {
  name: string;
  updated: Date;
}
