import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainDataPage } from './main-data.page';

const routes: Routes = [
  {
    path: 'client/:id',
    component: MainDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainDataPageRoutingModule {}
