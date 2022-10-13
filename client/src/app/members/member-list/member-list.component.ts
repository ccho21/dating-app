import { Component, OnInit, ViewChild } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/_models/pagination';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { take } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import Driver from 'driver.js';
import { MatGridList } from '@angular/material/grid-list';
import { MatSelect } from '@angular/material/select';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent implements OnInit {
  members: Member[];
  pagination: Pagination;
  userParams: UserParams;
  user: User;
  genderList = [
    { value: 'male', display: 'Males' },
    { value: 'female', display: 'Females' },
  ];

  driver: Driver;

  constructor(private memberService: MembersService) {
    this.userParams = this.memberService.getUserParams();
  }

  ngOnInit(): void {
    this.loadMembers();
    // this.startNavigationGuide();
  }

  loadMembers() {
    console.log(this.userParams);
    this.memberService.setUserParams(this.userParams);
    this.memberService.getMembers(this.userParams).subscribe((response) => {
      console.log('### RESPONSE', response);
      this.members = response.result;
      this.pagination = response.pagination;
      this.pagination.currentPage = response.pagination.currentPage - 1;
    });
  }
  change(e: MatSelect) {
    this.loadMembers();
  }
  resetFilters() {
    this.userParams = this.memberService.resetUserParams();
    this.loadMembers();
  }

  pageChanged(event: MatPaginator) {
    this.userParams.pageSize = event.pageSize;
    this.userParams.pageNumber = event.pageIndex + 1;
    console.log('### event', this.userParams);

    this.memberService.setUserParams(this.userParams);
    this.loadMembers();
  }

  startNavigationGuide() {
    if (!this.driver) {
      this.driver = new Driver({
        animate: true,
        keyboardControl: true,
      });

      const steps = [
        {
          element: '#login-step1',
          popover: {
            className: 'first-step-popover-class',
            title: 'Matches',
            description:
              'Menu that shows a list of members who might interest you. Please use filter to find someone you love!',
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
}
