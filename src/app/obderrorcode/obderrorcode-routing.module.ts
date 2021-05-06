import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ObderrorcodePage } from './obderrorcode.page';

const routes: Routes = [
  {
    path: '',
    component: ObderrorcodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ObderrorcodePageRoutingModule {}
