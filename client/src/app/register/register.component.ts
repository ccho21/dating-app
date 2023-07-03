import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../_services/account.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();

  maxDate?: Date;
  validationErrors: string[] = [];
  list: any[] = [];

  registerForm: FormGroup = this.fb.group({
    gender: ['male'],
    username: ['', Validators.required],
    knownAs: [''],
    dateOfBirth: ['', Validators.required],
    city: [''],
    country: ['', Validators.required],
    password: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(8)],
    ],
    confirmPassword: ['', [Validators.required, this.matchValues('password')]],
  });

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    public bsModalRef: BsModalRef
  )
  {}

  ngOnInit(): void {
    this.intitializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  intitializeForm() {}

  matchValues(matchTo: string): ValidatorFn {
    return (control: any) => {
      return control?.value === control?.parent?.controls[matchTo].value
        ? null
        : { isMatching: true };
    };
  }

  register() {
    console.log(this.registerForm?.value);
    this.accountService.register(this.registerForm?.value).subscribe({
      next: (res) => {
        console.log('### Successfully Registered ', res);
        // this._snackBar.open('Successfully Registered', 'Dance', {
        //   panelClass: ['blue-snackbar'],
        //   duration: 5000,
        //   verticalPosition: 'bottom',
        //   horizontalPosition: 'right',
        // });
        // this.dialogRef.close(true);
      },
      error: (err) => {
        this.validationErrors = err;

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

  cancel() {
    this.cancelRegister.emit(false);
  }
}
