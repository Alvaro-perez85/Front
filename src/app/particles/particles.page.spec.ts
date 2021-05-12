import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ParticlesPage } from './particles.page';

describe('ParticlesPage', () => {
  let component: ParticlesPage;
  let fixture: ComponentFixture<ParticlesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticlesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ParticlesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
