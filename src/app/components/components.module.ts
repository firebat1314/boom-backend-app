import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { PopupSearchComponent } from './popup-search/popup-search.component';
import { TreeComponent } from './tree/tree.component';

const coms: any[] = [
  ScrollToTopComponent,
  PopupSearchComponent,
  TreeComponent,
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    NgZorroAntdMobileModule
  ],
  declarations: [
    ...coms,
  ],
  exports: [
    ...coms,
  ]
})
export class ComponentsModule { }
