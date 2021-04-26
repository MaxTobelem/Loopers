import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ObdPage } from './obd.page';

describe('ObdPage', () => {
  let component: ObdPage;
  let fixture: ComponentFixture<ObdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObdPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ObdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
