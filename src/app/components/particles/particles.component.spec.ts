import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ParticlesComponent } from './particles.component';

describe('ParticlesComponent', () => {
  let component: ParticlesComponent;
  let fixture: ComponentFixture<ParticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticlesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ParticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
