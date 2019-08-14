import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GivePage } from './give.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { RestrictComponent } from './restrict/restrict.component';
import { ChangeComponent } from './change/change.component';
import { BatchAddComponent } from './batch-add/batch-add.component';

const routes: Routes = [
  {
    path: '',
    component: GivePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [GivePage, RestrictComponent, ChangeComponent, BatchAddComponent],
  entryComponents: [RestrictComponent, ChangeComponent, BatchAddComponent]
})
export class GivePageModule { }
