import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarmenuPageRoutingModule } from './carmenu-routing.module';

import { CarmenuPage } from './carmenu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarmenuPageRoutingModule
  ],
  declarations: [CarmenuPage]
})
export class CarmenuPageModule {}
