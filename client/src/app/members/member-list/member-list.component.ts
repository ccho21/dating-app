import { Component, OnInit, ViewChild } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MemberService } from 'src/app/_services/member.service';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/_models/pagination';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { take } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import Driver from 'driver.js';
import { MatGridList } from '@angular/material/grid-list';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent implements OnInit {
  members?: Member[];
  userParams?: UserParams;
  user?: User;

  predicate = 'liked';
  pageNumber = 1;
  pageSize = 5;
  pagination?: Pagination;

  constructor(private memberService: MemberService) {
    this.userParams = this.memberService.getUserParams();
  }

  ngOnInit(): void {
    this.loadMembers();
    // this.startNavigationGuide();
  }

  loadMembers(userParams?: UserParams) {
    if (userParams) {
      this.userParams = userParams;
    }
    if (this.userParams) {
      this.memberService.setUserParams(this.userParams);
      this.memberService.getMembers(this.userParams).subscribe((response) => {
        console.log('### RESPONSE', response);
        this.members = response.result;
        this.pagination = response.pagination;

        if (this.pagination) {
          this.pagination.currentPage = response.pagination.currentPage - 1;
        }
      });
    }
  }

  loadLikes() {
    this.memberService
      .getLikes(this.predicate, this.pageNumber, this.pageSize)
      .subscribe((response) => {
        if (response && response.pagination) {
          this.members = response.result as Member[];
          this.pagination = response.pagination;
          this.pagination.currentPage = response.pagination.currentPage - 1;
        }
      });
  }

  change(e: MatSelectChange) {
    this.loadMembers();
  }

  pageChanged(event: PageEvent) {
    if (this.userParams) {
      this.userParams.pageSize = event.pageSize;
      this.userParams.pageNumber = event.pageIndex + 1;
      console.log('### event', this.userParams);

      this.memberService.setUserParams(this.userParams);
      this.loadMembers();
    }
  }
}
