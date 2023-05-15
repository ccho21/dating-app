import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-job-detail-edit',
  templateUrl: './job-detail-edit.component.html',
  styleUrls: ['./job-detail-edit.component.scss'],
})
export class JobDetailEditComponent implements OnInit {
  @Input() detailForm?: FormGroup;
  maxDate?: Date;

  constructor() {}

  ngOnInit(): void {
    console.log('### job DETAIL INIT');
    console.log('### detailForm: ', this.detailForm);
  }
}
