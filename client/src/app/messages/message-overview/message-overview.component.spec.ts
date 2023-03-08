import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageOverviewComponent } from './message-overview.component';

describe('MessageOverviewComponent', () => {
  let component: MessageOverviewComponent;
  let fixture: ComponentFixture<MessageOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
