import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RegisterComponent } from '../register/register.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  bsModalRef?: BsModalRef;

  hide = true;
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      username: ['ccho', [Validators.required]],
      password: ['Pa$$w0rd', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  login() {
    this.loading = true;
    const { username, password } = this.form.value;
    const loginForm = {
      username,
      password,
    };

    console.log('###', loginForm);
    this.accountService.login(loginForm).subscribe({
      next: (res) => {
        this.router.navigateByUrl('/main');
        this.toastr.success('successfully logged in!');
        console.log('### successfully logged in ', res);
      },
      error: (err) => {
        if (err.status === 401) {
          this.toastr.error(
            'Invalid credentials. Please enter correct ID or Password'
          );
        } else {
          this.toastr.error('Error occured! Please try again');
        }
        this.loading = false;
      },
      complete: () => {
        console.log('### complete not working?');
        this.loading = false;
      },
    });
  }

  openModalWithComponent() {
    this.bsModalRef = this.modalService.show(RegisterComponent);
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
