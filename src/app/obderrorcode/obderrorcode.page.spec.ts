import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ObderrorcodePage } from './obderrorcode.page';

describe('ObderrorcodePage', () => {
  let component: ObderrorcodePage;
  let fixture: ComponentFixture<ObderrorcodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObderrorcodePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ObderrorcodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
