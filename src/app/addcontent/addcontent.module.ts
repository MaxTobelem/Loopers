import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddcontentPageRoutingModule } from './addcontent-routing.module';

import { AddcontentPage } from './addcontent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddcontentPageRoutingModule
  ],
  declarations: [AddcontentPage]
})
export class AddcontentPageModule {}
