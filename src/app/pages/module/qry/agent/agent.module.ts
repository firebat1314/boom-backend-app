import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AgentPage } from './agent.page';
import { SearchPageModule } from './search/search.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { AddOrUpdatePageModule } from './add-or-update/add-or-update.module';

const routes: Routes = [
  {
    path: '',
    component: AgentPage
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageModule,
    AddOrUpdatePageModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    NgZorroAntdMobileModule,
  ],
  declarations: [AgentPage]
})
export class AgentPageModule { }
