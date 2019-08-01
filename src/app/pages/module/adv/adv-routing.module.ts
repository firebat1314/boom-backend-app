import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  
  { path: 'qry', loadChildren: () =>import('../adv/qry/qry.module').then(mod => mod.QryPageModule) },
  { path: 'visit', loadChildren: () =>import('../adv/visit/visit.module').then(mod => mod.VisitPageModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvRoutingModule { }
