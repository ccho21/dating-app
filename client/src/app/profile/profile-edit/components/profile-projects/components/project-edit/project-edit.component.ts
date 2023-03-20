import {
  Component,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss'],
})
export class ProjectEditComponent implements OnInit, OnChanges {
  @Input() projectForm?: FormGroup;
  maxDate?: Date;

  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    console.log('### event', $event);
    if (this.projectForm?.dirty) {
      $event.returnValue = true;
    }
  }

  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {}
}
