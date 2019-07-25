import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MailPage } from './mail.page';
import { TargetComponent } from './target/target.component';
import { GlobalComponent } from './global/global.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';

const routes: Routes = [
  {
    path: '',
    component: MailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    NgZorroAntdMobileModule
  ],
  declarations: [MailPage, TargetComponent, GlobalComponent],
  entryComponents: [TargetComponent, GlobalComponent]
})
export class MailPageModule {}
