import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { JobDescription } from 'src/app/_models/experience';

@Component({
  selector: 'app-experience-edit',
  templateUrl: './experience-edit.component.html',
  styleUrls: ['./experience-edit.component.scss'],
})
export class ExperienceEditComponent implements OnInit {
  @Input() experienceForm?: FormGroup;
  maxDate?: Date;
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.experienceForm?.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(private fb: FormBuilder) {}

  get jobDescriptions(): FormArray {
    return this.experienceForm?.get('jobDescriptions') as FormArray;
  }

  ngOnInit(): void {
    if (this.experienceForm) {
      // this.addJobDescription();
    }
  }
}
