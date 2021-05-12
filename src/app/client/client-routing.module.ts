import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientPage } from './client.page';

import { ClientResolver} from './../services/client-resolver.service'

const routes: Routes = [
  {
    path: '',
    component: ClientPage,
    resolve:{
      client: ClientResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientPageRoutingModule {}
