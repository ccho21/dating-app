import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Project } from '../../_models/project';
import { ProjectParams } from '../../_models/projectParams';
import { ProjectService } from '../../_services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  @Input() projects?: Project[];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    console.log('### project list destroyed');
  }
}
