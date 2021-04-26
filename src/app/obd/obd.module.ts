import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ObdPageRoutingModule } from './obd-routing.module';

import { ObdPage } from './obd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ObdPageRoutingModule
  ],
  declarations: [ObdPage]
})
export class ObdPageModule {}
