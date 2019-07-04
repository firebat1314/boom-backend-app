import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TradePage } from './trade.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { SearchPageModule } from './search/search.module';

const routes: Routes = [
  {
    path: '',
    component: TradePage
  }
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
  declarations: [TradePage]
})
export class TradePageModule { }
