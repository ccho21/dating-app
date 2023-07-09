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
import { ToastrService } from 'ngx-toastr';

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
    name: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    city: [''],
    country: [''],
    password: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(8)],
    ],
    confirmPassword: ['', [Validators.required, this.matchValues('password')]],
  });

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    public bsModalRef: BsModalRef,
    private toastr: ToastrService
  ) {}

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
        this.closeModal();
        this.toastr.success('Successfully registered');
      },
      error: (err) => {
        this.validationErrors = err;

        console.log('### ERROR', err);
        this.toastr.error('Error occured! Please try again');
      },
    });
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
