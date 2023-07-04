import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageMembersComponent } from './message-members.component';

describe('MessageMembersComponent', () => {
  let component: MessageMembersComponent;
  let fixture: ComponentFixture<MessageMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageMembersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
