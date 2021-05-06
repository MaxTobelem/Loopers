import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ObderrorcodePageRoutingModule } from './obderrorcode-routing.module';

import { ObderrorcodePage } from './obderrorcode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ObderrorcodePageRoutingModule
  ],
  declarations: [ObderrorcodePage]
})
export class ObderrorcodePageModule {}
