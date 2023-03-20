import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss'],
})
export class ProjectEditComponent implements OnInit {
  @Input() projectForm?: FormGroup;
  maxDate?: Date;

  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.projectForm?.dirty) {
      $event.returnValue = true;
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
