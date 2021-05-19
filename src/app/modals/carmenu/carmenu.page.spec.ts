import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CarmenuPage } from './carmenu.page';

describe('CarmenuPage', () => {
  let component: CarmenuPage;
  let fixture: ComponentFixture<CarmenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarmenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CarmenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
