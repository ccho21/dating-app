import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-overview',
  templateUrl: './profile-overview.component.html',
  styleUrls: ['./profile-overview.component.scss'],
})
export class ProfileOverviewComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {}
  ngOnDestroy(): void {
    console.log('### DESTROY');
  }
}
