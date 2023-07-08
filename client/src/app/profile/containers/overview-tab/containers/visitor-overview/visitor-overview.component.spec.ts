import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorOverviewComponent } from './visitor-overview.component';

describe('VisitorOverviewComponent', () => {
  let component: VisitorOverviewComponent;
  let fixture: ComponentFixture<VisitorOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitorOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitorOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
