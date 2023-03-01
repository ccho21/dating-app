import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { Pagination } from '../_models/pagination';
import { ConfirmService } from '../_services/confirm.service';
import { MessageService } from '../_services/message.service';
import Driver from 'driver.js';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  messages?: Message[] = [];
  pagination?: Pagination;
  container = 'Inbox';
  pageNumber = 1;
  pageSize = 10;
  loading = false;

  driver?: Driver;

  //

  columns: string[] = [
    'senderUsername',
    'recipientUsername',
    'content',
    'messageSent',
  ];
  displayedColumns: Array<string> = [];

  //

  constructor(
    private messageService: MessageService,
    private confirmService: ConfirmService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadMessages();
    // this.startNavigationGuide();
  }

  loadMessages() {
    this.handleColumns();

    this.loading = true;
    this.messageService
      .getMessages(this.pageNumber, this.pageSize, this.container)
      .subscribe((response) => {
        console.log('### responsez', response);
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
}
