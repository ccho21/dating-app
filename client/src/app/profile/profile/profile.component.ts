import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MemberService } from 'src/app/_services/member.service';
import { Member } from 'src/app/_models/member';
import { Subscription } from 'rxjs';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';

interface ITab {
  title: string;
  content: string;
  component: string;
  removable: boolean;
  disabled: boolean;
  active?: boolean;
  customClass?: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  @ViewChild('profileTabs', { static: false }) profileTabs?: TabsetComponent;

  container?: ViewContainerRef;

  userSub$?: Subscription;

  member?: Member;
  loading: boolean = false;
  constructor(
    private accountService: AccountService,
    private memberService: MemberService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (params) => {
        setTimeout(() => {
          params['tab'] && this.selectTab(params['tab']);
        }, 200);
      },
    });

    this.userSub$ = this.accountService.currentUser$.subscribe(
      (user: User | null) => {
        if (user) {
          this.loading = true;

          this.memberService.getMember(user.username).subscribe({
            next: (member) => {
              this.member = member;
            },
            complete: () => {
              this.loading = false;
            },
          });
        }
      }
    );
  }

  selectTab(heading: string) {
    if (this.profileTabs) {
      this.profileTabs.tabs.find((x) => x.heading === heading)!.active = true;
    }
  }

  activateTab(tab: TabDirective) {
    if (tab && tab.heading) {
      this.router.navigate(['/main'], { queryParams: { tab: tab.heading } });
    }
  }

  ngOnDestroy(): void {
    this.userSub$!.unsubscribe();
  }
}
