import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'sort', loadChildren: () => import('./sort/sort.module').then(mod => mod.SortPageModule) },
  { path: 'web', loadChildren: () => import('./web/web.module').then(mod => mod.WebPageModule) },
  { path: 'func', loadChildren: () => import('./func/func.module').then(mod => mod.FuncPageModule) },
  { path: 'give', loadChildren: () => import('./give/give.module').then(mod => mod.GivePageModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
