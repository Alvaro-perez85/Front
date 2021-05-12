import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecirculationComponent } from './recirculation.component';

describe('RecirculationComponent', () => {
  let component: RecirculationComponent;
  let fixture: ComponentFixture<RecirculationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecirculationComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecirculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
