import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCardOneComponent } from './project-card-one.component';

describe('ProjectCardOneComponent', () => {
  let component: ProjectCardOneComponent;
  let fixture: ComponentFixture<ProjectCardOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectCardOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectCardOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
