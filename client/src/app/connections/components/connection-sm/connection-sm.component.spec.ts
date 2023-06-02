import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionSmComponent } from './connection-sm.component';

describe('ConnectionSmComponent', () => {
  let component: ConnectionSmComponent;
  let fixture: ComponentFixture<ConnectionSmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectionSmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectionSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
