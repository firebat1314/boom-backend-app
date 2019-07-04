import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamePage } from './game.page';

const routes: Routes = [
    {
        path: '',
        component: GamePage,
    },
    { path: 'dragon', loadChildren: './details/dragon/dragon.module#DragonPageModule' },
    { path: 'grabniu', loadChildren: './details/grabniu/grabniu.module#GrabniuPageModule' },
    { path: 'animal', loadChildren: './details/animal/animal.module#AnimalPageModule' },
    { path: 'car', loadChildren: './details/car/car.module#CarPageModule' },
    { path: 'fish', loadChildren: './details/fish/fish.module#FishPageModule' },
    { path: 'lottery', loadChildren: './details/lottery/lottery.module#LotteryPageModule' },
    { path: 'landlords', loadChildren: './details/landlords/landlords.module#LandlordsPageModule' },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GameRoutingModule { }
