import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user?: User;
  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe((user: User | null) => {
      if (user) {
        this.user = user;
        console.log('### this.user', this.user);
      }
    });
  }
}
