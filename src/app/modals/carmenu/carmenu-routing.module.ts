import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarmenuPage } from './carmenu.page';

const routes: Routes = [
  {
    path: '',
    component: CarmenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarmenuPageRoutingModule {}
