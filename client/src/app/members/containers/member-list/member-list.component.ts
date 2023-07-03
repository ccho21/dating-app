import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MemberService } from 'src/app/_services/member.service';
import { Observable } from 'rxjs';
import { PaginatedResult, Pagination } from 'src/app/_models/pagination';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { take } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import {
  Router,
  ActivatedRoute,
} from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent implements OnInit, OnDestroy {
  members?: Member[];
  userParams?: UserParams;
  user?: User;

  predicate?: string | null;
  pageNumber = 1;
  pageSize = 12;
  pagination?: Pagination;
  activeTab: any;

  constructor(
    private memberService: MemberService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userParams = this.memberService.getUserParams();
  }
  ngOnDestroy(): void {
    console.log('### DESTROYED');
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params) {
        console.log(' ### PARAMS ', params);
        this.predicate = params.predicate ? params.predicate : null;

        this.loadMembers();
      }
    });
  }

  loadMembers() {
    this.memberService
      .getLikes(this.predicate as string, this.pageNumber, this.pageSize)
      .subscribe((response) => {
        if (response && response.pagination) {
          this.members = response.result as Member[];
          this.pagination = response.pagination;
          this.pagination.currentPage = response.pagination.currentPage - 1;
        }
      });
  }

  search(params: UserParams) {
    console.log('### e', params);
    this.memberService.getMembers(params).subscribe((response) => {
      console.log('### res', response);
      if (response && response.pagination) {
        this.members = response.result as Member[];
        this.pagination = response.pagination;
        this.pagination.currentPage = response.pagination.currentPage - 1;
      }
    });
  }
}
