import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MapobdPage } from './mapobd.page';

describe('MapobdPage', () => {
  let component: MapobdPage;
  let fixture: ComponentFixture<MapobdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapobdPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MapobdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
