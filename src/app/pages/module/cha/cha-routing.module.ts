import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'admin', loadChildren: '../cha/admin/admin.module#AdminPageModule' },
  { path: 'coin', loadChildren: '../cha/coin/coin.module#CoinPageModule' },
  { path: 'count', loadChildren: '../cha/count/count.module#CountPageModule' },
  { path: 'new', loadChildren: '../cha/new/new.module#NewPageModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChaRoutingModule { }
