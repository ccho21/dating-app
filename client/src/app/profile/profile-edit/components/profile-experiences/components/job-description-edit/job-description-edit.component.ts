import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-job-description-edit',
  templateUrl: './job-description-edit.component.html',
  styleUrls: ['./job-description-edit.component.scss'],
})
export class JobDescriptionEditComponent implements OnInit {
  maxDate?: Date;
  @Input() jdForm?: FormGroup;

  constructor() {}

  ngOnInit(): void {
  }
}
