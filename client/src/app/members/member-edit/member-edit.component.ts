import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { take } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss'],
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm?: NgForm;
  member?: Member;
  user?: User;
  activeTab?: number;

  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private accountService: AccountService,
    private memberService: MembersService,
    private _snackBar: MatSnackBar
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user as User));
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.memberService
      .getMember(this.user?.username as string)
      .subscribe((member) => {
        this.member = member;
      });
  }

  updateMember() {
    this.memberService.updateMember(this.member as Member).subscribe(() => {
      this._snackBar.open(`Profile updated successfully`, 'okay', {
        duration: 5000,
        verticalPosition: 'bottom',
      });
      this.editForm?.reset(this.member);
    });
  }

  selectTab(tab: MatTabChangeEvent) {
    // if (tab.index === 3 && this.messages.length === 0) {
    //   this.messageService.createHubConnection(this.user, this.member.username);
    // } else {
    //   this.messageService.stopHubConnection();
    // }
  }
}
