import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  bsModalRef?: BsModalRef;

  hide = true;
  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    public accountService: AccountService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['lisa', [Validators.required]],
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

    console.log('###', loginForm);
    this.accountService.login(loginForm).subscribe({
      next: (res) => {
        this.router.navigateByUrl('/main');
        console.log('### successfully logged in ', res);
        // this._snackBar.open('successfully logged in', 'Dance', {
        //   panelClass: ['blue-snackbar'],
        //   duration: 5000,
        //   verticalPosition: 'bottom',
        //   horizontalPosition: 'right',
        // });
        // this.dialogRef.close(true);
      },
      error: (err) => {
        console.log('### ERROR', err);
        // this._snackBar.open('Error occured', 'Dance', {
        //   panelClass: ['red-snackbar'],
        //   duration: 5000,
        //   verticalPosition: 'bottom',
        //   horizontalPosition: 'right',
        // });
      },
    });
  }

  openModalWithComponent() {
    const initialState: ModalOptions = {
      initialState: {
        list: [
          'Open a modal with component',
          'Pass your data',
          'Do something else',
          '...',
        ],
        title: 'Modal with component',
      },
    };
    this.bsModalRef = this.modalService.show(
      RegisterComponent,
      initialState
    );
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  ok() {}
}
