import { Component, OnInit, ViewChild } from '@angular/core';
import { Member } from '../_models/member';
import { Pagination } from '../_models/pagination';
import { MembersService } from '../_services/members.service';
import Driver from 'driver.js';
import { MatGridList } from '@angular/material/grid-list';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {
  @ViewChild('grid') grid?: MatGridList;
  gridByBreakpoint = {
    xl: 5,
    lg: 3,
    md: 3,
    sm: 2,
    xs: 1,
  };

  members?: Partial<Member[]>;
  predicate = 'liked';
  pageNumber = 1;
  pageSize = 5;
  pagination?: Pagination;
  driver?: Driver;

  constructor(private memberService: MembersService) {}

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

  pageChanged(event: PageEvent) {
    console.log('event', event);
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadLikes();
  }

  startNavigationGuide() {
    if (!this.driver) {
      this.driver = new Driver({
        animate: true,
        keyboardControl: true,
      });

      const steps = [
        {
          element: '#login-step2',
          popover: {
            title: 'Lists',
            description:
              'Menu that shows members you already liked and who liked you.',
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
