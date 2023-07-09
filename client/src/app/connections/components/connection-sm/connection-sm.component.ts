import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MemberService } from 'src/app/_services/member.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-connection-sm',
  templateUrl: './connection-sm.component.html',
  styleUrls: ['./connection-sm.component.scss'],
})
export class ConnectionSmComponent implements OnInit, OnDestroy {
  @Input() member?: Partial<Member>;
  @Input() noImage?: boolean = false;

  @Output() updateMembers: EventEmitter<string> = new EventEmitter();

  currentUser?: User | null;
  userSub$?: Subscription;

  constructor(
    private memberService: MemberService,
    private accountService: AccountService,
    public presence: PresenceService,
    private toastr: ToastrService
  ) {
    console.log('### working');
  }
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

  removeLike(member: Member) {
    this.memberService.removeLike(member.username).subscribe(() => {
      // update using ngrx later
      this.updateMembers.emit();

      this.toastr.success(`You have removed like from ${member.username}`);
    });
  }

  getLikedUserIndex(member: Partial<Member>): number {
    return member && member.likedByUsers
      ? member.likedByUsers.findIndex(
          (user) => user?.username === this.currentUser?.username
        )
      : -1;
  }
}
