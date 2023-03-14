import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { concatMap, Observable, tap } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MemberService } from 'src/app/_services/member.service';
import { PresenceService } from 'src/app/_services/presence.service';
// install Swiper modules
import SwiperCore, { Pagination, Navigation, SwiperOptions } from 'swiper';
SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
})
export class MemberComponent implements OnInit, OnDestroy {
  member?: Member;
  galleryImages?: any[];

  currentUser?: User | null;
  isLiked: boolean = false;

 

  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,
    public presence: PresenceService,
    private _snackBar: MatSnackBar,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe((res: User | null) => {
      this.currentUser = res;
    });

    this.route.data.subscribe((data) => {
      console.log('### DATA?', data);
      this.member = data['member'];
      if (this.member) {
        this.isLiked = this.isLiked =
          this.getLikedUserIndex(this.member) === -1 ? false : true;
      }
    });
  }

  addOrRemoveLike(member: Member) {
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
      .subscribe((member) => {
        this._snackBar.open(message, 'okay', {
          duration: 5000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
        });
      });
  }

  getLikedUserIndex(member: Member): number {
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

  ngOnDestroy(): void {
    if (this.member) {
      this.member = undefined;
    }
  }
}
