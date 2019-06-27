import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'profit', loadChildren: '../stats/profit/profit.module#ProfitPageModule' },
  { path: 'gold-chg-rank', loadChildren: '../stats/gold-chg-rank/gold-chg-rank.module#GoldChgRankPageModule' },
  { path: 'operate', loadChildren: '../stats/operate/operate.module#OperatePageModule' },
  { path: 'game', loadChildren: '../stats/game/game.module#GamePageModule' },
  { path: 'online', loadChildren: '../stats/online/online.module#OnlinePageModule' },
  { path: 'pay', loadChildren: '../stats/pay/pay.module#PayPageModule' },
  { path: 'coin', loadChildren: '../stats/coin/coin.module#CoinPageModule' },
  { path: 'exchg', loadChildren: '../stats/exchg/exchg.module#ExchgPageModule' },
  { path: 'user', loadChildren: '../stats/user/user.module#UserPageModule' },
  { path: 'tax', loadChildren: '../stats/tax/tax.module#TaxPageModule' },
  { path: 'keep', loadChildren: '../stats/keep/keep.module#KeepPageModule' },
  { path: 'ch-data', loadChildren: '../stats/ch-data/ch-data.module#ChDataPageModule' },
  { path: 'flow', loadChildren: '../stats/flow/flow.module#FlowPageModule' },
  { path: 'wadv', loadChildren: '../stats/wadv/wadv.module#WadvPageModule' },
  { path: 'first', loadChildren: '../stats/first/first.module#FirstPageModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatsRoutingModule { }
