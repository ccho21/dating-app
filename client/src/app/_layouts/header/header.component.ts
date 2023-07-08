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

  screenHeight?: number;
  screenWidth?: number;
  isDropdownOpen: boolean = false;
  isMobileDropdownOpen: boolean = false;

  constructor(public accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe((user: User | null) => {
      if (user) this.user = user;
    });
  }

  handleChange(isOpen: boolean): void {
    console.log('### data', isOpen);
    this.isDropdownOpen = isOpen;
  }

  handleMobileChange(data: boolean): void {
    console.log('### data', data);
    this.isMobileDropdownOpen = data;
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
