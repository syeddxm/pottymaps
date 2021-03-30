import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BathroomPage } from './bathroom.page';

describe('BathroomPage', () => {
  let component: BathroomPage;
  let fixture: ComponentFixture<BathroomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BathroomPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BathroomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
