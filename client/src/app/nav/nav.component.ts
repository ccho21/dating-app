import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Driver from 'driver.js';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  model: any = {};

  driver: Driver;
  constructor(
    public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.model.username = 'lisa';
    this.model.password = 'Pa$$w0rd';

    setTimeout(() => {
      this.startNavigationGuide();
    }, 1000);
  }

  startNavigationGuide() {
    if (!this.driver) {
      this.driver = new Driver({
        animate: true,
        keyboardControl: true,
      });

      const steps = [
        {
          element: '#step1',
          popover: {
            className: 'first-step-popover-class',
            title: 'WELCOME TO DATING APP',
            description:
              'I would like to give you a quick tour. <br> You can register here if you are interested.',
            position: 'bottom-center',
          },
        },
        {
          element: '#step2',
          popover: {
            title: 'Login',
            description:
              'Just type Just enter <strong>lisa</strong> or <strong>todd</strong> in username and click login!',
            position: 'bottom-center',
          },
        },
      ];
      console.log('### this driver', steps);
      this.driver.defineSteps(steps);
      this.driver.start();
    }
  }

  resetNavigationGuide() {
    if (this.driver) {
      this.driver.reset();
      this.driver = undefined;
    }
  }
  login() {
    this.accountService.login(this.model).subscribe((response) => {
      this.router.navigateByUrl('/members');
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
