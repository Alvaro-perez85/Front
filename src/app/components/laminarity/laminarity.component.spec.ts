import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LaminarityComponent } from './laminarity.component';

describe('LaminarityComponent', () => {
  let component: LaminarityComponent;
  let fixture: ComponentFixture<LaminarityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaminarityComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LaminarityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
