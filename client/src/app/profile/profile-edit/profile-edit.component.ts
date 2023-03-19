import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MemberService } from 'src/app/_services/member.service';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit {
  @ViewChild('editForm') editForm?: NgForm;
  member?: Member;
  user?: User;
  activeTab?: number;

  // registerForm: FormGroup = this.fb.group({
  //   gender: ['male'],
  //   name: [''],
  //   knownAs: [''],
  //   dateOfBirth: [''],
  //   city: [''],
  //   country: [''],
  //   introduction: [''],
  //   lookingFor: [''],
  //   interests: [''],
  //   website: [''],
  // });

  // @HostListener('window:beforeunload', ['$event']) unloadNotification(
  //   $event: any
  // ) {
  //   if (this.editForm?.dirty) {
  //     $event.returnValue = true;
  //   }
  // }

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
    // this.loadMember();
  }

  // loadMember() {
  //   this.memberService
  //     .getMember(this.user?.username as string)
  //     .subscribe((member) => {
  //       this.member = member;
  //       this.updateForm(this.member);
  //     });
  // }

  // updateMember() {
  //   this.memberService.updateMember(this.member as Member).subscribe(() => {
  //     this._snackBar.open(`Profile updated successfully`, 'okay', {
  //       duration: 5000,
  //       verticalPosition: 'bottom',
  //     });
  //     this.editForm?.reset(this.member);
  //   });
  // }

  // updateForm(member: Member) {
  //   const {
  //     name,
  //     interests,
  //     lookingFor,
  //     city,
  //     country,
  //     gender,
  //     introduction,
  //     knownAs,
  //   } = member;
  //   this.registerForm.patchValue({
  //     name: knownAs,
  //     interests,
  //     lookingFor,
  //     city,
  //     country,
  //     gender,
  //     introduction,
  //   });

  //   console.log('### this.register form', this.registerForm.value);
  // }

  selectTab(tab: MatTabChangeEvent) {
    // if (tab.index === 3 && this.messages.length === 0) {
    //   this.messageService.createHubConnection(this.user, this.member.username);
    // } else {
    //   this.messageService.stopHubConnection();
    // }
  }
}
