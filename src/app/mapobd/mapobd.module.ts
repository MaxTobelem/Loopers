import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapobdPageRoutingModule } from './mapobd-routing.module';

import { MapobdPage } from './mapobd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapobdPageRoutingModule
  ],
  declarations: [MapobdPage]
})
export class MapobdPageModule {}
