import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-connection-overview',
  templateUrl: './connection-overview.component.html',
  styleUrls: ['./connection-overview.component.scss'],
})
export class ConnectionOverviewComponent implements OnInit {
  @ViewChild('connectTabs', { static: true }) connectTabs?: TabsetComponent;

  members?: Partial<Member[]>;
  predicate = 'liked';
  pageNumber = 1;
  pageSize = 5;
  pagination?: Pagination;

  activeTab: any;

  constructor(private memberService: MemberService, private router: Router) {}

  ngOnInit(): void {
    this.loadMembersWithLikes();
  }

  loadMembersWithLikes(predicate: string = 'liked') {
    this.memberService
      .getLikes(predicate, this.pageNumber, this.pageSize)
      .subscribe((response) => {
        if (response && response.pagination) {
          console.log('### response', response);
          this.members = response.result;
          this.pagination = response.pagination;
          this.pagination.currentPage = response.pagination.currentPage - 1;
        }
      });
  }

  activateTab(tab: TabDirective) {
    console.log('### tab', tab);
    if (tab.heading === 'Follwing') {
      this.predicate = 'like';
    } else {
      this.predicate = 'liked';
    }
    console.log(this.predicate);
    this.loadMembersWithLikes(this.predicate);
  }
}
