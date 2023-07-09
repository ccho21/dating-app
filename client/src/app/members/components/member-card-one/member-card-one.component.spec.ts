import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberCardOneComponent } from './member-card-one.component';

describe('MemberCardOneComponent', () => {
  let component: MemberCardOneComponent;
  let fixture: ComponentFixture<MemberCardOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberCardOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberCardOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
