import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParticlesPage } from './particles.page';

const routes: Routes = [
  {
    path: '',
    component: ParticlesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParticlesPageRoutingModule {}
