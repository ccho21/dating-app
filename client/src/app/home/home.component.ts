import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { MembersService } from '../_services/members.service';
import { UserParams } from '../_models/userParams';
import { User } from '../_models/user';
import { Member } from '../_models/member';
import { Pagination } from '../_models/pagination';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  registerMode = false;

  members?: Member[];
  pagination?: Pagination;
  userParams?: UserParams;
  user?: User;

  genderList = [
    { value: 'male', display: 'Males' },
    { value: 'female', display: 'Females' },
  ];

  imageUrls = [
    'home-background-1.jpg',
    'home-background-2.jpg',
    'home-background-3.jpg',
  ];
  constructor(
    public dialog: MatDialog,
    public accountService: AccountService,
    private router: Router,
    private memberService: MembersService
  ) {}

  ngOnInit(): void {}

  // openRegister() {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;

  //   const dialogRef = this.dialog.open(RegisterComponent, dialogConfig);

  //   dialogRef
  //     .afterClosed()
  //     .subscribe(() => this.router.navigateByUrl('/members'));
  // }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }

  loadMembers(userParams?: UserParams) {
    if (userParams) {
      this.userParams = userParams;
    }
    if (this.userParams) {
      this.memberService.setUserParams(this.userParams);
      this.memberService.getMembers(this.userParams).subscribe((response) => {
        console.log('### RESPONSE', response);
        this.members = response.result;
        this.pagination = response.pagination;

        if (this.pagination) {
          this.pagination.currentPage = response.pagination.currentPage - 1;
        }
      });
    }
  }
  checkLoggedIn() {
    this.accountService.currentUser$.subscribe((res) => {
      if (!res) {
        alert('!!! please login first.');
      }
      console.log('### res', res);
    });
  }
}
