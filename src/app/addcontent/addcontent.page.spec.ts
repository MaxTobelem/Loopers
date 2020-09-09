import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddcontentPage } from './addcontent.page';

describe('AddcontentPage', () => {
  let component: AddcontentPage;
  let fixture: ComponentFixture<AddcontentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcontentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddcontentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
