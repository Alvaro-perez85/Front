import {AuthGuard} from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  }, 
  {
    path: '',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'client',
    loadChildren: () => import('./client/client.module').then( m => m.ClientPageModule)
  },
  
 
  
  /* estas rutas estan en tabs 
  {
    path: 'main-data',
    loadChildren: () => import('./main-data/main-data.module').then( m => m.MainDataPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'particles',
    loadChildren: () => import('./particles/particles.module').then( m => m.ParticlesPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'velocities',
    loadChildren: () => import('./velocities/velocities.module').then( m => m.VelocitiesPageModule),
    canLoad: [AuthGuard]
  },*/
  //{ path: '', redirectTo: 'tabs', pathMatch: 'full' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
