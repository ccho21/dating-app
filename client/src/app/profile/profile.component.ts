import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user?: User;
  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe((res) => {
      this.user = res!;
    });
  }
}
