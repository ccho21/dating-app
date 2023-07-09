import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { concatMap, Observable, Subscription, tap } from 'rxjs';
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

  isLiked?: boolean;
  loading?: boolean;

  constructor(
    private memberService: MemberService,
    public presence: PresenceService,
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
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
    this.loading = true;
    let observable$: Observable<Object>;
    let message: string;
    const index = this.getLikedUserIndex(member);
    if (index !== -1) {
      observable$ = this.memberService.removeLike(member.username);
      message = `You have removed like from ${member.username} `;
    } else {
      observable$ = this.memberService.addLike(member.username);
      message = `You have liked ${member.username}`;
    }
    observable$
      .pipe(
        concatMap((_) => {
          return this.memberService.getMember(member.username).pipe(
            tap((member) => {
              console.log('###', member);
              this.member = member;
              this.isLiked =
                this.getLikedUserIndex(this.member) === -1 ? false : true;
            })
          );
        })
      )
      .subscribe({
        next: (member) => {
          this.toastr.success(message);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  getLikedUserIndex(member: Member) {
    return member.likedByUsers
      ? member.likedByUsers.findIndex(
          (user) => user?.username === this.currentUser?.username
        )
      : -1;
  }
}
