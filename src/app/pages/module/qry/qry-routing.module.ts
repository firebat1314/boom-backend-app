import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'user', loadChildren: () =>import('../qry/user/user.module').then(mod => mod.UserPageModule) },
  { path: 'game', loadChildren: () =>import('../qry/game/game.module').then(mod => mod.GamePageModule) },
  { path: 'bao', loadChildren: () =>import('../qry/bao/bao.module').then(mod => mod.BaoPageModule) },
  { path: 'trade', loadChildren: () =>import('../qry/trade/trade.module').then(mod => mod.TradePageModule) },
  { path: 'bank', loadChildren: () =>import('../qry/bank/bank.module').then(mod => mod.BankPageModule) },
  { path: 'exchg', loadChildren: () =>import('../qry/exchg/exchg.module').then(mod => mod.ExchgPageModule) },
  { path: 'pay', loadChildren: () =>import('../qry/pay/pay.module').then(mod => mod.PayPageModule) },
  { path: 'mail', loadChildren: () =>import('../qry/mail/mail.module').then(mod => mod.MailPageModule) },
  { path: 'agent', loadChildren: () =>import('../qry/agent/agent.module').then(mod => mod.AgentPageModule) },
  { path: 'adv', loadChildren: () =>import('../qry/adv/adv.module').then(mod => mod.AdvPageModule) },
  { path: 'reply', loadChildren: () =>import('../qry/reply/reply.module').then(mod => mod.ReplyPageModule) },
  { path: 'wadv', loadChildren: () =>import('../qry/wadv/wadv.module').then(mod => mod.WadvPageModule) },
  { path: '', redirectTo: 'user' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QryRoutingModule { }
