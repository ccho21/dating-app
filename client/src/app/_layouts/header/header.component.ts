import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isCollapsed = false;
  navbarFixed = false;
  user?: User | null;

  constructor(public accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe((user: User | null) => {
      if (user) this.user = user;
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (offset > 0) {
      this.navbarFixed = true;
    } else {
      this.navbarFixed = false;
    }
  }
  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
