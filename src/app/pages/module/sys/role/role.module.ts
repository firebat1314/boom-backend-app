import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RolePage } from './role.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { RoleAddOrUpdateComponent } from './role-add-or-update/role-add-or-update.component';

const routes: Routes = [
  {
    path: '',
    component: RolePage
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
  declarations: [RolePage, RoleAddOrUpdateComponent],
  entryComponents: [RoleAddOrUpdateComponent]
})
export class RolePageModule {}
