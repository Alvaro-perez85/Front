import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PreasureComponent } from './preasure.component';

describe('PreasureComponent', () => {
  let component: PreasureComponent;
  let fixture: ComponentFixture<PreasureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreasureComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PreasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
