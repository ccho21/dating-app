import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';

@Component({
  selector: 'app-about-tab',
  templateUrl: './about-tab.component.html',
  styleUrls: ['./about-tab.component.scss'],
})
export class AboutTabComponent implements OnInit {
  @Input() member?: Member;
  constructor() {}

  ngOnInit(): void {}
}
