import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionOverviewComponent } from './connection-overview.component';

describe('ConnectionOverviewComponent', () => {
  let component: ConnectionOverviewComponent;
  let fixture: ComponentFixture<ConnectionOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectionOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectionOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
