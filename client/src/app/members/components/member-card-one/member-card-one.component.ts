import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { concatMap, Observable, tap } from 'rxjs';
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

  isLiked?: boolean;
  loading?: boolean;

  constructor(
    private memberService: MemberService,
    public presence: PresenceService,
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe((res: User | null) => {
      this.currentUser = res;
    });
  }

  addOrRemoveLike(member: Member) {
    this.loading = true;
    let observable$: Observable<Object>;
    let message: string;
    const index = this.getLikedUserIndex(member);
    if (index !== -1) {
      observable$ = this.memberService.removeLike(member.username);
      message = `You have removed like from ${member.knownAs}`;
    } else {
      observable$ = this.memberService.addLike(member.username);
      message = `You have liked ${member.knownAs}`;
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
