import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MainDataPage } from './main-data.page';

describe('MainDataPage', () => {
  let component: MainDataPage;
  let fixture: ComponentFixture<MainDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainDataPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MainDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
