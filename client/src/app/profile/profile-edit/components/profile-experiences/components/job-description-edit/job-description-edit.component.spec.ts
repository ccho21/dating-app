import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDescriptionEditComponent } from './job-description-edit.component';

describe('JobDescriptionEditComponent', () => {
  let component: JobDescriptionEditComponent;
  let fixture: ComponentFixture<JobDescriptionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobDescriptionEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobDescriptionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
