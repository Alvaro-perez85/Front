import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TightnessComponent } from './tightness.component';

describe('TightnessComponent', () => {
  let component: TightnessComponent;
  let fixture: ComponentFixture<TightnessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TightnessComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TightnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
