import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MemberService } from 'src/app/_services/member.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-connection-card',
  templateUrl: './connection-card.component.html',
  styleUrls: ['./connection-card.component.scss'],
})
export class ConnectionCardComponent implements OnInit {
  @Input() member?: Partial<Member>;
  @Output() updateMembers: EventEmitter<string> = new EventEmitter();
  currentUser?: User | null;
  @Input() noImage?: boolean = false;

  constructor(
    private memberService: MemberService,
    private accountService: AccountService,
    public presence: PresenceService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe((res: User | null) => {
      this.currentUser = res;
    });
  }

  removeLike(member: Member) {
    this.memberService.removeLike(member.username).subscribe(() => {
      // update using ngrx later
      this.updateMembers.emit();

      this._snackBar.open(
        `You have removed like from ${member.knownAs}`,
        'okay',
        {
          duration: 5000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
        }
      );
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
