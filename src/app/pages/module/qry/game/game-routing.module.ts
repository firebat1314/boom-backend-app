import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamePage } from './game.page';

const routes: Routes = [
    {
        path: '',
        component: GamePage,
    },
    { path: 'dragon', loadChildren: () => import('./details/dragon/dragon.module').then(mod => mod.DragonPageModule) },
    { path: 'grabniu', loadChildren: () => import('./details/grabniu/grabniu.module').then(mod => mod.GrabniuPageModule) },
    { path: 'animal', loadChildren: () => import('./details/animal/animal.module').then(mod => mod.AnimalPageModule) },
    { path: 'car', loadChildren: () => import('./details/car/car.module').then(mod => mod.CarPageModule) },
    { path: 'fish', loadChildren: () => import('./details/fish/fish.module').then(mod => mod.FishPageModule) },
    { path: 'lottery', loadChildren: () => import('./details/lottery/lottery.module').then(mod => mod.LotteryPageModule) },
    { path: 'landlords', loadChildren: () => import('./details/landlords/landlords.module').then(mod => mod.LandlordsPageModule) },
    { path: 'record-list', loadChildren: './record-list/record-list.module#RecordListPageModule' },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GameRoutingModule { }
