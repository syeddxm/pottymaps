import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TimingChipComponent } from './timing-chip.component';

describe('TimingChipComponent', () => {
  let component: TimingChipComponent;
  let fixture: ComponentFixture<TimingChipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimingChipComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TimingChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
