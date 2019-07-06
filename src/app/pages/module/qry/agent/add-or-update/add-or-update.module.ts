import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddOrUpdatePage } from './add-or-update.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [AddOrUpdatePage],
  entryComponents: [AddOrUpdatePage],
})
export class AddOrUpdatePageModule { }
