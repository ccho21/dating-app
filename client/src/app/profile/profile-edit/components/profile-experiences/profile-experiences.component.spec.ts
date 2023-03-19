import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileExperiencesComponent } from './profile-experiences.component';

describe('ProfileExperiencesComponent', () => {
  let component: ProfileExperiencesComponent;
  let fixture: ComponentFixture<ProfileExperiencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileExperiencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileExperiencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
