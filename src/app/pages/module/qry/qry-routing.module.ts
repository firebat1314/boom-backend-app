import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'user', loadChildren: '../qry/user/user.module#UserPageModule' },
  { path: 'game', loadChildren: '../qry/game/game.module#GamePageModule' },
  { path: 'bao', loadChildren: '../qry/bao/bao.module#BaoPageModule' },
  { path: 'trade', loadChildren: '../qry/trade/trade.module#TradePageModule' },
  { path: 'bank', loadChildren: '../qry/bank/bank.module#BankPageModule' },
  { path: 'exchg', loadChildren: '../qry/exchg/exchg.module#ExchgPageModule' },
  { path: 'pay', loadChildren: '../qry/pay/pay.module#PayPageModule' },
  { path: 'mail', loadChildren: '../qry/mail/mail.module#MailPageModule' },
  { path: 'agent', loadChildren: '../qry/agent/agent.module#AgentPageModule' },
  { path: 'adv', loadChildren: '../qry/adv/adv.module#AdvPageModule' },
  { path: 'reply', loadChildren: '../qry/reply/reply.module#ReplyPageModule' },
  { path: 'wadv', loadChildren: '../qry/wadv/wadv.module#WadvPageModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QryRoutingModule { }
