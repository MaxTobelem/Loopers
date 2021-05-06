import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapobdPage } from './mapobd.page';

const routes: Routes = [
  {
    path: '',
    component: MapobdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapobdPageRoutingModule {}
