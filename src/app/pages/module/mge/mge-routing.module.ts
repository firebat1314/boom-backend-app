import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  
  { path: 'accountconfig', loadChildren: '../mge/accountconfig/accountconfig.module#AccountconfigPageModule' },
  { path: 'boomconfig', loadChildren: '../mge/boomconfig/boomconfig.module#BoomconfigPageModule' },
  { path: 'game', loadChildren: '../mge/game/game.module#GamePageModule' },
  { path: 'ip-list', loadChildren: '../mge/ip-list/ip-list.module#IpListPageModule' },
  { path: 'riskexchg', loadChildren: '../mge/riskexchg/riskexchg.module#RiskexchgPageModule' },
  { path: 'scharge', loadChildren: '../mge/scharge/scharge.module#SchargePageModule' },
  { path: 'notice', loadChildren: '../mge/notice/notice.module#NoticePageModule' },
  { path: 'server', loadChildren: '../mge/server/server.module#ServerPageModule' },
  { path: 'stock', loadChildren: '../mge/stock/stock.module#StockPageModule' },
  { path: 'rule', loadChildren: '../mge/rule/rule.module#RulePageModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MgeRoutingModule { }
