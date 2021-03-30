import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BathroomPage } from './bathroom.page';

const routes: Routes = [
  {
    path: '',
    component: BathroomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BathroomPageRoutingModule {}
