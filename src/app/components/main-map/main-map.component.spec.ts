import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MainMapComponent } from './main-map.component';

describe('MainMapComponent', () => {
  let component: MainMapComponent;
  let fixture: ComponentFixture<MainMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainMapComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MainMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
