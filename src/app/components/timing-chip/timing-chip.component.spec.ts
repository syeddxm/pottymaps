import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimingChipComponent } from './timing-chip.component';

describe('TimingChipComponent', () => {
  let component: TimingChipComponent;
  let fixture: ComponentFixture<TimingChipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimingChipComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimingChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
