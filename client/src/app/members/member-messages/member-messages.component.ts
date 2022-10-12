import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/message';
import { MembersService } from 'src/app/_services/members.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.scss'],
})
export class MemberMessagesComponent implements OnInit, OnChanges {
  @ViewChild('messageForm') messageForm: NgForm;
  @Input() messages: Message[];
  @Input() member: Member;
  messageContent: string;
  loading = false;

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

  constructor(public messageService: MessageService) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log('### CHANGES', changes);
    if (changes.messages) {
      console.log('### changes ', changes);
    }
  }

  ngOnInit(): void {}

  sendMessage() {
    this.loading = true;
    console.log(this.messageContent);
    this.messageService
      .sendMessage(this.member.username, this.messageContent)
      .then(() => {
        this.messageForm.reset();
      })
      .finally(() => (this.loading = false));
  }
}

export interface Section {
  name: string;
  updated: Date;
}
