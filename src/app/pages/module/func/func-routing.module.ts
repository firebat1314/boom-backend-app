import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'exchg', loadChildren: '../func/exchg/exchg.module#ExchgPageModule' },
  { path: 'frozen', loadChildren: '../func/frozen/frozen.module#FrozenPageModule' },
  { path: 'mail', loadChildren: '../func/mail/mail.module#MailPageModule' },
  { path: 'reply', loadChildren: '../func/reply/reply.module#ReplyPageModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncRoutingModule { }
