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
  selector: 'app-connection-card',
  templateUrl: './connection-card.component.html',
  styleUrls: ['./connection-card.component.scss'],
})
export class ConnectionCardComponent implements OnInit, OnDestroy {
  @Input() member?: Partial<Member>;
  @Output() updateMembers: EventEmitter<string> = new EventEmitter();
  currentUser?: User | null;
  userSub$?: Subscription;

  @Input() noImage?: boolean = false;

  constructor(
    private memberService: MemberService,
    private accountService: AccountService,
    public presence: PresenceService,
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

  removeLike(member: Member) {
    this.memberService.removeLike(member.username).subscribe(() => {
      // update using ngrx later
      this.updateMembers.emit();

      this.toastr.success(`You have removed like from ${member.username}`);
    });
  }
}
