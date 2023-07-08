import { Component, Input, OnInit } from '@angular/core';
import { Experience } from 'src/app/_models/experience';

@Component({
  selector: 'app-experience-card',
  templateUrl: './experience-card.component.html',
  styleUrls: ['./experience-card.component.scss'],
})
export class ExperienceCardComponent implements OnInit {
  @Input() experience?: Experience;
  constructor() {}

  ngOnInit(): void {}
}
