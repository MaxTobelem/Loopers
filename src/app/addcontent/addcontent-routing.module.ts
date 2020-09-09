import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddcontentPage } from './addcontent.page';

const routes: Routes = [
  {
    path: '',
    component: AddcontentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddcontentPageRoutingModule {}
