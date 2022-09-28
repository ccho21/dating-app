import { Component, OnInit } from '@angular/core';
import { Member } from '../_models/member';
import { Pagination } from '../_models/pagination';
import { MembersService } from '../_services/members.service';
import Driver from 'driver.js';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {
  members: Partial<Member[]>;
  predicate = 'liked';
  pageNumber = 1;
  pageSize = 5;
  pagination: Pagination;
  driver: Driver;

  constructor(private memberService: MembersService) {}

  ngOnInit(): void {
    this.loadLikes();
    this.startNavigationGuide();
  }
  loadLikes() {
    this.memberService
      .getLikes(this.predicate, this.pageNumber, this.pageSize)
      .subscribe((response) => {
        this.members = response.result;
        this.pagination = response.pagination;
      });
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
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
