import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BorrowPage } from './borrow.page';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: BorrowPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgZorroAntdMobileModule,
    ComponentsModule
  ],
  declarations: [BorrowPage]
})
export class BorrowPageModule { }
