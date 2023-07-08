import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MemberService } from 'src/app/_services/member.service';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm | undefined;
  member: Member | undefined;
  user: User | undefined;
  activeTab: number | undefined;

  constructor(
    private accountService: AccountService,
    private memberService: MemberService
  ) {}

  ngOnInit(): void {
    // this.loadUser();
  }

  loadUser(): void {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.user = user as User;
      this.loadMember(this.user.username);
    });
  }

  loadMember(username: string): void {
    this.memberService.getMember(username).subscribe((member) => {
      this.member = member;
    });
  }

  updateMember(): void {
    if (this.member) {
      this.memberService.updateMember(this.member).subscribe(() => {
        this.editForm?.resetForm(this.member);
      });
    }
  }
}
