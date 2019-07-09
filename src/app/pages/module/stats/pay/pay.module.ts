import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PayPage } from './pay.page';
import { SearchPageModule } from './search/search.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { SuccessOrderPageModule } from './success-order/success-order.module';

const routes: Routes = [
  {
    path: '',
    component: PayPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SearchPageModule,
    SuccessOrderPageModule,
    ComponentsModule,
    NgZorroAntdMobileModule,
  ],
  declarations: [PayPage]
})
export class PayPageModule { }
