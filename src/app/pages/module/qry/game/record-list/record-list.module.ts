import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RecordListPage } from './record-list.page';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: RecordListPage
  },
  { path: 'dragon', loadChildren: () => import('../details/dragon/dragon.module').then(mod => mod.DragonPageModule) },
  { path: 'grabniu', loadChildren: () => import('../details/grabniu/grabniu.module').then(mod => mod.GrabniuPageModule) },
  { path: 'animal', loadChildren: () => import('../details/animal/animal.module').then(mod => mod.AnimalPageModule) },
  { path: 'car', loadChildren: () => import('../details/car/car.module').then(mod => mod.CarPageModule) },
  { path: 'fish', loadChildren: () => import('../details/fish/fish.module').then(mod => mod.FishPageModule) },
  { path: 'lottery', loadChildren: () => import('../details/lottery/lottery.module').then(mod => mod.LotteryPageModule) },
  { path: 'landlords', loadChildren: () => import('../details/landlords/landlords.module').then(mod => mod.LandlordsPageModule) },
  { path: 'details', loadChildren: '../details/details.module#DetailsPageModule' },

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
  ],
  declarations: [RecordListPage]
})
export class RecordListPageModule { }
