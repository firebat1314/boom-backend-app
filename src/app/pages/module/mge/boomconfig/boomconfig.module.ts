import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BoomconfigPage } from './boomconfig.page';

const routes: Routes = [
  {
    path: '',
    component: BoomconfigPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BoomconfigPage]
})
export class BoomconfigPageModule {}
