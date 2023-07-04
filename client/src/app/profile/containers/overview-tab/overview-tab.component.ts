import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/app/_models/member';

@Component({
  selector: 'app-overview-tab',
  templateUrl: './overview-tab.component.html',
  styleUrls: ['./overview-tab.component.scss'],
})
export class OverviewTabComponent implements OnInit, OnDestroy {
  @Input() member?: Member;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    console.log('### DESTROY');
  }
}
