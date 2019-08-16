import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamePage } from './game.page';

const routes: Routes = [
    {
        path: '',
        component: GamePage,
    },
    { path: 'record-list', loadChildren: () => import('./record-list/record-list.module').then(mod => mod.RecordListPageModule) },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GameRoutingModule { }
