import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { Pagination } from 'src/app/_models/pagination';
import { UserParams } from 'src/app/_models/userParams';
import { User } from 'src/app/_models/user';
import Driver from 'driver.js';

@Component({
  selector: 'app-member-search',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.scss'],
})
export class MemberSearchComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<UserParams>();
  members?: Member[];
  pagination?: Pagination;

  userParams?: UserParams;

  user?: User;
  genderList = [
    { value: 'male', display: 'Males' },
    { value: 'female', display: 'Females' },
  ];

  driver?: Driver;

  constructor(private memberService: MembersService) {
    this.userParams = this.memberService.getUserParams();
  }

  ngOnInit(): void {
    this.userParams = {
      gender: 'female',
      maxAge: 70,
      minAge: 18,
      orderBy: 'lastActive',
      pageNumber: 0,
      pageSize: 10,
    };
    this.search();
    // this.startNavigationGuide();
  }

  resetFilters() {
    this.userParams = this.memberService.resetUserParams();
  }

  search() {
    console.log('### check this user params', this.userParams);
    if (this.userParams) {
      this.memberService.setUserParams(this.userParams);
      this.searchEvent.emit(this.userParams);
    }
  }
}
