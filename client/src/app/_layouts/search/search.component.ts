import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { UserParams } from 'src/app/_models/userParams';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  members: Member[] = [];
  pagination: Pagination | undefined;
  userParams: UserParams | undefined;
  genderList = [
    { value: 'male', display: 'Males' },
    { value: 'female', display: 'Females' },
  ];

  constructor(private memberService: MemberService) {
    this.userParams = this.memberService.getUserParams();
  }

  ngOnInit(): void {}

  resetFilters() {
    // this.userParams = this.memberService.resetUserParams();
    // this.loadMembers();
  }

  pageChanged(event: any) {
    // if (this.userParams && this.userParams?.pageNumber !== event.page) {
    //   this.userParams.pageNumber = event.page;
    //   this.memberService.setUserParams(this.userParams);
    //   this.loadMembers();
    // }
  }
}
