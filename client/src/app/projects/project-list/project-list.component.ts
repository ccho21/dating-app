import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/_models/project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  @Input() projects?: Project[];
  constructor() {}

  ngOnInit(): void {
    console.log('### projects', this.projects);
  }
}
