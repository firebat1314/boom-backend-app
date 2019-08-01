import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'exchg', loadChildren: () =>import('../func/exchg/exchg.module').then(mod => mod.ExchgPageModule) },
  { path: 'frozen', loadChildren: () =>import('../func/frozen/frozen.module').then(mod => mod.FrozenPageModule) },
  { path: 'mail', loadChildren: () =>import('../func/mail/mail.module').then(mod => mod.MailPageModule) },
  { path: 'reply', loadChildren: () =>import('../func/reply/reply.module').then(mod => mod.ReplyPageModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncRoutingModule { }
