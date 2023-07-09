import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { concatMap, Observable, Subscription } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MemberService } from 'src/app/_services/member.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss'],
})
export class MemberCardComponent implements OnInit, OnDestroy {
  @Input() member?: Member;
  currentUser?: User;
  userSub$?: Subscription;

  constructor(
    private memberService: MemberService,
    public presence: PresenceService,
    private accountService: AccountService,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.userSub$!.unsubscribe();
  }

  ngOnInit(): void {
    this.userSub$ = this.accountService.currentUser$.subscribe(
      (user: User | null) => {
        if (user) {
          this.currentUser = user;
        }
      }
    );
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
