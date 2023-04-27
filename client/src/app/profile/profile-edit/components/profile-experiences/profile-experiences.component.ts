import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MemberService } from 'src/app/_services/member.service';
import { take } from 'rxjs/operators';
import { Form, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Detail, Experience, JobDescription } from 'src/app/_models/experience';
@Component({
  selector: 'app-profile-experiences',
  templateUrl: './profile-experiences.component.html',
  styleUrls: ['./profile-experiences.component.scss'],
})
export class ProfileExperiencesComponent implements OnInit {
  member?: Member;
  user?: User;
  maxDate?: Date;
  experiencesForm: FormGroup = this.fb.group({
    experiences: this.fb.array([]),
  });

  btns?: Array<any>;
  get experiences(): FormArray {
    return this.experiencesForm.get('experiences') as FormArray;
  }

  constructor(
    private accountService: AccountService,
    private memberService: MemberService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user as User));
  }

  ngOnInit(): void {
    this.btns = [
      {
        btnLabel: 'Add Experience',
        btnLink: '/main/dashboard/experiences/create',
        customClass: '',
      },
      {
        btnLabel: 'View All Experience',
        btnLink: '/main/experiences',
        customClass: '',
      },
    ];
    console.log('### experience');
    this.maxDate = new Date();
  }
}
