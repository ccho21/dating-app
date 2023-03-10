import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Member } from 'src/app/_models/member';
import { MemberService } from 'src/app/_services/member.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-connection-card',
  templateUrl: './connection-card.component.html',
  styleUrls: ['./connection-card.component.scss'],
})
export class ConnectionCardComponent implements OnInit {
  @Input() member?: Member;

  constructor(
    private memberService: MemberService,
    public presence: PresenceService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  addLike(member: Member) {
    this.memberService.addLike(member.username).subscribe(() => {
      this._snackBar.open(`You have liked ${member.knownAs}`, 'okay', {
        duration: 5000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
      });
    });
  }
}
