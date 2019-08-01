import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BaoPage } from './bao.page';
import { SearchPageModule } from './search/search.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';

const routes: Routes = [
  {
    path: '',
    component: BaoPage
  },
  { path: 'borrow', loadChildren: () => import('./borrow/borrow.module').then(mod => mod.BorrowPageModule) },
  { path: 'deposit', loadChildren: () => import('./deposit/deposit.module').then(mod => mod.DepositPageModule) },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SearchPageModule,
    ComponentsModule,
    NgZorroAntdMobileModule
  ],
  declarations: [BaoPage]
})
export class BaoPageModule { }
