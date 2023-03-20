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

  get details(): FormArray {
    return this.jdForm?.get('details') as FormArray;
  }
  constructor() {}

  ngOnInit(): void {
    console.log('### job Description INIT');
    console.log('### jdForm: ', this.jdForm);
  }
}
