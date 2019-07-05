import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPage } from './search.page';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgZorroAntdMobileModule
  ],
  declarations: [SearchPage],
  entryComponents: [SearchPage]
})
export class SearchPageModule { }
