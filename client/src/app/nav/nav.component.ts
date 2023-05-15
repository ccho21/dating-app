import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import Driver from 'driver.js';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  model: any = {};

  driver?: Driver;
  constructor(
    public dialog: MatDialog,
    public accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
   
  }

  resetNavigationGuide() {
    if (this.driver) {
      this.driver.reset();
      this.driver = undefined;
    }
  }

  openLogin() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(LoginComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .subscribe(() => this.router.navigateByUrl('/'));
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
