import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'profit', loadChildren: () =>import('../stats/profit/profit.module').then(mod => mod.ProfitPageModule) },
  { path: 'goldChgRank', loadChildren: () =>import('../stats/gold-chg-rank/gold-chg-rank.module').then(mod => mod.GoldChgRankPageModule) },
  { path: 'operate', loadChildren: () =>import('../stats/operate/operate.module').then(mod => mod.OperatePageModule) },
  { path: 'game', loadChildren: () =>import('../stats/game/game.module').then(mod => mod.GamePageModule) },
  { path: 'online', loadChildren: () =>import('../stats/online/online.module').then(mod => mod.OnlinePageModule) },
  { path: 'pay', loadChildren: () =>import('../stats/pay/pay.module').then(mod => mod.PayPageModule) },
  { path: 'coin', loadChildren: () =>import('../stats/coin/coin.module').then(mod => mod.CoinPageModule) },
  { path: 'exchg', loadChildren: () =>import('../stats/exchg/exchg.module').then(mod => mod.ExchgPageModule) },
  { path: 'user', loadChildren: () =>import('../stats/user/user.module').then(mod => mod.UserPageModule) },
  { path: 'tax', loadChildren: () =>import('../stats/tax/tax.module').then(mod => mod.TaxPageModule) },
  { path: 'keep', loadChildren: () =>import('../stats/keep/keep.module').then(mod => mod.KeepPageModule) },
  { path: 'chData', loadChildren: () =>import('../stats/ch-data/ch-data.module').then(mod => mod.ChDataPageModule) },
  { path: 'flow', loadChildren: () =>import('../stats/flow/flow.module').then(mod => mod.FlowPageModule) },
  { path: 'wadv', loadChildren: () =>import('../stats/wadv/wadv.module').then(mod => mod.WadvPageModule) },
  { path: 'first', loadChildren: () =>import('../stats/first/first.module').then(mod => mod.FirstPageModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatsRoutingModule { }
