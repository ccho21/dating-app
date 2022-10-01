import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  hide = true;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LoginComponent>,
    public accountService: AccountService,
    private _snackBar: MatSnackBar
  ) {
    this.form = fb.group({
      username: [null, [Validators.required]],
      password: ['Pa$$w0rd', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  login() {
    const { username, password } = this.form.value;
    const loginForm = {
      username,
      password,
    };

    this.accountService.login(loginForm).subscribe({
      next: (res) => {
        console.log('### successfully logged in ', res);
        this._snackBar.open('successfully logged in', 'Dance', {
          panelClass: ['blue-snackbar'],
          duration: 5000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
        });
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.log('### ERROR', err);
        this._snackBar.open('Error occured', 'Dance', {
          panelClass: ['red-snackbar'],
          duration: 5000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
        });
      },
    });
  }

  ok() {}
}
