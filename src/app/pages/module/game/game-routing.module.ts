import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'sort', loadChildren: './sort/sort.module#SortPageModule' },
  { path: 'web', loadChildren: './web/web.module#WebPageModule' },
  { path: 'func', loadChildren: './func/func.module#FuncPageModule' },
  { path: 'give', loadChildren: './give/give.module#GivePageModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
