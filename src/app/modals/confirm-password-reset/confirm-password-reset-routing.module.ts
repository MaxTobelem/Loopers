import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmPasswordResetPage } from './confirm-password-reset.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmPasswordResetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmPasswordResetPageRoutingModule {}
