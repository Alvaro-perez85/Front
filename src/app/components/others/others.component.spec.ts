import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OthersComponent } from './others.component';

describe('OthersComponent', () => {
  let component: OthersComponent;
  let fixture: ComponentFixture<OthersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OthersComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
