import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'admin', loadChildren: () =>import('../cha/admin/admin.module').then(mod => mod.AdminPageModule) },
  { path: 'coin', loadChildren: () =>import('../cha/coin/coin.module').then(mod => mod.CoinPageModule) },
  { path: 'count', loadChildren: () =>import('../cha/count/count.module').then(mod => mod.CountPageModule) },
  { path: 'new', loadChildren: () =>import('../cha/new/new.module').then(mod => mod.NewPageModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChaRoutingModule { }
