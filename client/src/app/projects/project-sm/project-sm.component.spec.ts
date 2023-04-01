import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSmComponent } from './project-sm.component';

describe('ProjectSmComponent', () => {
  let component: ProjectSmComponent;
  let fixture: ComponentFixture<ProjectSmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectSmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
