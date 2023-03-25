import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { PresenceService } from './_services/presence.service';
import { setTheme } from 'ngx-bootstrap/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'The Dating app';
  user?: User;

  constructor(
    private accountService: AccountService,
    private presence: PresenceService
  ) {}

  ngOnInit() {
    setTheme('bs5');
    this.setCurrentUser();
  }

  setCurrentUser() {
    this.user = JSON.parse(localStorage.getItem('user') as string);
    if (this.user) {
      this.accountService.setCurrentUser(this.user);
      this.presence.createHubConnection(this.user);
    }
  }
}
