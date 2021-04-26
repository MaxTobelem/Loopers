import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ObdPage } from './obd.page';

const routes: Routes = [
  {
    path: '',
    component: ObdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ObdPageRoutingModule {}
