import { Component, OnInit, ViewChild } from '@angular/core';
import { Member } from '../_models/member';
import { Pagination } from '../_models/pagination';
import { MemberService } from '../_services/member.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {
  members?: Partial<Member[]>;
  predicate = 'liked';
  pageNumber = 1;
  pageSize = 5;
  pagination?: Pagination;

  constructor(private memberService: MemberService) {}

  ngOnInit(): void {
    this.loadLikes();
    // this.startNavigationGuide();
  }

  loadLikes() {
    this.memberService
      .getLikes(this.predicate, this.pageNumber, this.pageSize)
      .subscribe((response) => {
        if (response && response.pagination) {
          this.members = response.result;
          this.pagination = response.pagination;
          this.pagination.currentPage = response.pagination.currentPage - 1;
        }
      });
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadLikes();
    }
  }
}
