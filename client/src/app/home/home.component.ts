import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  registerMode = false;

  constructor(
    public dialog: MatDialog,
    public accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  openRegister() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(RegisterComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .subscribe(() => this.router.navigateByUrl('/members'));
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
}
