import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ConfirmPasswordResetPageRoutingModule } from './confirm-password-reset-routing.module';

import { ConfirmPasswordResetPage } from './confirm-password-reset.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ConfirmPasswordResetPageRoutingModule
  ],
  declarations: [ConfirmPasswordResetPage]
})
export class ConfirmPasswordResetPageModule {}
