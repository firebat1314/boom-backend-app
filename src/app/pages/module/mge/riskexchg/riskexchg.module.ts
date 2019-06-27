import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RiskexchgPage } from './riskexchg.page';

const routes: Routes = [
  {
    path: '',
    component: RiskexchgPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RiskexchgPage]
})
export class RiskexchgPageModule {}
