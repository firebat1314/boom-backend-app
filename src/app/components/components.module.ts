import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';

const coms: any[] = [
  ScrollToTopComponent,
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
  ],
  entryComponents: [],
})
export class ComponentsModule { }
