import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDetailEditComponent } from './job-detail-edit.component';

describe('JobDetailEditComponent', () => {
  let component: JobDetailEditComponent;
  let fixture: ComponentFixture<JobDetailEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobDetailEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
