import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'user', loadChildren: '../sys/user/user.module#UserPageModule' },
  { path: 'role', loadChildren: '../sys/role/role.module#RolePageModule' },
  { path: 'menu', loadChildren: '../sys/menu/menu.module#MenuPageModule' },
  { path: 'config', loadChildren: '../sys/config/config.module#ConfigPageModule' },
  { path: 'log', loadChildren: '../sys/log/log.module#LogPageModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysRoutingModule { }
