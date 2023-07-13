import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { ScreenService } from 'src/app/_services/screen.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  @ViewChild('staticTabs', { static: false }) staticTabs?: TabsetComponent;
  isMobile?: boolean;

  @Input() member?: Member;
  constructor(private screenService: ScreenService) {}

  ngOnInit(): void {
    if (this.screenService.isBelowMd()) this.isMobile = true;
  }

  selectTab(tabId: number) {
    console.log('### ', tabId);
    if (this.staticTabs?.tabs[tabId]) {
      this.staticTabs.tabs[tabId].active = true;
    }
  }
}
