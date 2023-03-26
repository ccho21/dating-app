import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

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
export class ProfileComponent implements OnInit {
  @ViewChild('profileTabs', { static: true }) profileTabs?: TabsetComponent;

  container?: ViewContainerRef;
  user?: User;

  tabs: ITab[] = [
    {
      title: 'Overview',
      content: 'Dynamic content 1',
      component: 'ProfileOverview',
      removable: false,
      disabled: false,
      active: false,
    },
    {
      title: 'About',
      content: 'Dynamic content 2',
      component: 'ProfileOverview',

      removable: false,
      disabled: false,
      active: false,
    },
    {
      title: 'Message',
      content: 'Dynamic content 3',
      component: 'ProfileOverview',

      removable: true,
      disabled: false,
      active: false,
    },
    {
      title: 'Projects',
      content: 'Dynamic content 3',
      component: 'ProfileOverview',

      removable: true,
      disabled: false,
      active: false,
    },
    {
      title: 'Experiences',
      content: 'Dynamic content 3',
      component: 'ProfileOverview',

      removable: true,
      disabled: false,
      active: false,
    },
    {
      title: 'Education',
      content: 'Dynamic content 3',
      component: 'ProfileOverview',

      removable: true,
      disabled: false,
      active: false,
    },
    {
      title: 'Skills',
      content: 'Dynamic content 3',
      component: 'ProfileOverview',

      removable: true,
      disabled: false,
      active: false,
    },
  ];
  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (params) => {
        const { tab } = params;
        params['tab'] && this.selectTab(tab);
      },
    });

    this.accountService.currentUser$.subscribe((user: User | null) => {
      if (user) {
        this.user = user;
        console.log('### this.user', this.user);
      }
    });

    console.log('### profile tabs', this.profileTabs);
  }

  selectTab(title: string) {
    console.log(title);
    this.tabs.find(
      (x) => x.title.toLowerCase() === title.toLowerCase()
    )!.active = true;
  }

  activateTab(tab: TabDirective) {
    console.log('### activate tab', tab.heading);
    this.router.navigate(['/main'], { queryParams: { tab: tab.heading } });
  }
}
