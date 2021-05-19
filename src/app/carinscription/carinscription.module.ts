import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarinscriptionPageRoutingModule } from './carinscription-routing.module';

import { CarinscriptionPage } from './carinscription.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    CarinscriptionPageRoutingModule
  ],
  declarations: [CarinscriptionPage]
})
export class CarinscriptionPageModule {}
