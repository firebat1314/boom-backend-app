import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  
  { path: 'accountconfig', loadChildren: () =>import('../mge/accountconfig/accountconfig.module').then(mod => mod.AccountconfigPageModule) },
  { path: 'boomconfig', loadChildren: () =>import('../mge/boomconfig/boomconfig.module').then(mod => mod.BoomconfigPageModule) },
  { path: 'game', loadChildren: () =>import('../mge/game/game.module').then(mod => mod.GamePageModule) },
  { path: 'ip-list', loadChildren: () =>import('../mge/ip-list/ip-list.module').then(mod => mod.IpListPageModule) },
  { path: 'riskexchg', loadChildren: () =>import('../mge/riskexchg/riskexchg.module').then(mod => mod.RiskexchgPageModule) },
  { path: 'scharge', loadChildren: () =>import('../mge/scharge/scharge.module').then(mod => mod.SchargePageModule) },
  { path: 'notice', loadChildren: () =>import('../mge/notice/notice.module').then(mod => mod.NoticePageModule) },
  { path: 'server', loadChildren: () =>import('../mge/server/server.module').then(mod => mod.ServerPageModule) },
  { path: 'stock', loadChildren: () =>import('../mge/stock/stock.module').then(mod => mod.StockPageModule) },
  { path: 'rule', loadChildren: () =>import('../mge/rule/rule.module').then(mod => mod.RulePageModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MgeRoutingModule { }
