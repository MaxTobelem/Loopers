import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CarinscriptionPage } from './carinscription.page';

describe('CarinscriptionPage', () => {
  let component: CarinscriptionPage;
  let fixture: ComponentFixture<CarinscriptionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarinscriptionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CarinscriptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
