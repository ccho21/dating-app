import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concatMap, Observable, Subscription, tap } from 'rxjs';
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

  currentUser?: User;
  userSub$?: Subscription;

  isLiked: boolean = false;

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: false,
    pagination: { clickable: true, dynamicBullets: true },
    scrollbar: { draggable: true },
  };

  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,
    public presence: PresenceService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.userSub$ = this.accountService.currentUser$.subscribe(
      (user: User | null) => {
        if (user) {
          this.currentUser = user;
        }
      }
    );

    this.route.data.subscribe((data) => {
      console.log('### DATA?', data);
      this.member = data['member'];
      if (this.member) {
        this.isLiked =
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
      message = `You have removed like from ${member.username}`;
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
      .subscribe((member) => {
        // this._snackBar.open(message, 'okay', {
        //   duration: 5000,
        //   verticalPosition: 'bottom',
        //   horizontalPosition: 'right',
        // });
      });
  }

  getLikedUserIndex(member: Member): number {
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
    this.userSub$!.unsubscribe();
  }
}
