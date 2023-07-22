import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-connection-modal',
  templateUrl: './connection-modal.component.html',
  styleUrls: ['./connection-modal.component.scss'],
})
export class ConnectionModalComponent implements OnInit {
  members?: Partial<Member[]>;
  predicate = 'liked';
  pageNumber = 1;
  pageSize = 20;
  pagination?: Pagination;

  activeTab: any;
  loading: boolean = false;

  constructor(
    private memberService: MemberService,
    public bsModalRef: BsModalRef
  ) {}

  ngOnInit(): void {
    this.loadMembersWithLikes();
  }

  loadMembersWithLikes(predicate: string = 'liked') {
    console.log('### predicate ', this.predicate)
    this.loading = true;
    this.memberService
      .getLikes(this.predicate, this.pageNumber, this.pageSize)
      .subscribe({
        next: (response) => {
          if (response && response.pagination) {
            console.log('### response', response);
            this.members = response.result;
            this.pagination = response.pagination;
            this.pagination.currentPage = response.pagination.currentPage - 1;
          }
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
}
