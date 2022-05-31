import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudPage } from './crud.page';

const routes: Routes = [
  {
    path: '',
    component: CrudPage,
    children: [ 
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'intro',
        loadChildren: () => import('../intro/intro.module').then( m => m.IntroPageModule)
      },
      {
        path: 'history',
        loadChildren: () => import('../history/history.module').then( m => m.HistoryPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then( m => m.SettingsPageModule)
      },
      {
        path: 'tracer',
        loadChildren: () => import('../tracer/tracer.module').then( m => m.TracerPageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('../account/account.module').then( m => m.AccountPageModule)
      },
      {
        path: '',
        redirectTo: '/crud/home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudPageRoutingModule {}
