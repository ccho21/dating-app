import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { PresenceService } from './_services/presence.service';
import { setTheme } from 'ngx-bootstrap/utils';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'The Dating app';
  user?: User;
  loading?: boolean;

  constructor(
    private accountService: AccountService,
    private presence: PresenceService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log('### NAV START');
        this.loading = true;
      }
      if (event instanceof NavigationEnd) {
        console.log('### NAV END');

        this.loading = false;
      }
    });
  }

  ngOnInit() {
    setTheme('bs5');
    this.setCurrentUser();

    this.spinner.show();
    this.spinner.hide();
  }

  setCurrentUser() {
    this.user = JSON.parse(localStorage.getItem('user') as string);
    if (this.user) {
      this.accountService.setCurrentUser(this.user);
      this.presence.createHubConnection(this.user);
    }
  }
}
