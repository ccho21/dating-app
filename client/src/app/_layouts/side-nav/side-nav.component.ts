import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  url?: string;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log('## NG ONOINIT');
    this.url = 'about';

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log('Route change detected', event);
        const url = event.url.split('/');
        this.url = url[url.length - 1];
        console.log('### this.url', this.url);
      }
    });
  }
}
