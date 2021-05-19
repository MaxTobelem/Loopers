import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarinscriptionPage } from './carinscription.page';

const routes: Routes = [
  {
    path: '',
    component: CarinscriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarinscriptionPageRoutingModule {}
