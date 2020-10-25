import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasswordresetPageRoutingModule } from './passwordreset-routing.module';

import { PasswordresetPage } from './passwordreset.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    PasswordresetPageRoutingModule
  ],
  declarations: [PasswordresetPage]
})
export class PasswordresetPageModule {}
