import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextInputOneComponent } from './text-input-one.component';

describe('TextInputOneComponent', () => {
  let component: TextInputOneComponent;
  let fixture: ComponentFixture<TextInputOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextInputOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextInputOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
