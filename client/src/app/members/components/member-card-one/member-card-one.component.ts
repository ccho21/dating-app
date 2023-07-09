import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { concatMap, Observable } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MemberService } from 'src/app/_services/member.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-member-card-one',
  templateUrl: './member-card-one.component.html',
  styleUrls: ['./member-card-one.component.scss'],
})
export class MemberCardOneComponent implements OnInit {
  @Input() member?: Member;
  currentUser?: User | null;

  constructor(
    private memberService: MemberService,
    public presence: PresenceService,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe((res: User | null) => {
      this.currentUser = res;
    });
  }

  addOrRemoveLike(member: Member) {
    let observable$: Observable<Object>;
    let message: string;

    this.memberService
      .getMember(member.username)
      .pipe(
        concatMap((member: Member) => {
          const index = this.getLikedUserIndex(member);
          if (index !== -1) {
            observable$ = this.memberService.removeLike(member.username);
            message = `You have removed like from ${member.knownAs}`;
          } else {
            observable$ = this.memberService.addLike(member.username);
            message = `You have liked ${member.knownAs}`;
          }
          return observable$;
        })
      )
      .subscribe(() => {
        // this._snackBar.open(message, 'okay', {
        //   duration: 5000,
        //   verticalPosition: 'bottom',
        //   horizontalPosition: 'right',
        // });
      });
  }

  getLikedUserIndex(member: Member) {
    console.log(
      '### like',
      member.likedByUsers.findIndex(
        (user) => user?.username === this.currentUser?.username
      )
    );
    return member.likedByUsers
      ? member.likedByUsers.findIndex(
          (user) => user?.username === this.currentUser?.username
        )
      : -1;
  }
}
