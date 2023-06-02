import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-overview-tab',
  templateUrl: './overview-tab.component.html',
  styleUrls: ['./overview-tab.component.scss'],
})
export class OverviewTabComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {}
  ngOnDestroy(): void {
    console.log('### DESTROY');
  }
}
