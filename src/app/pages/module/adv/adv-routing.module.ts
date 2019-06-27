import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  
  { path: 'qry', loadChildren: '../adv/qry/qry.module#QryPageModule' },
  { path: 'visit', loadChildren: '../adv/visit/visit.module#VisitPageModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvRoutingModule { }
