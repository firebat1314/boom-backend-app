import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'user', loadChildren: () =>import('../sys/user/user.module').then(mod => mod.UserPageModule) },
  { path: 'role', loadChildren: () =>import('../sys/role/role.module').then(mod => mod.RolePageModule) },
  { path: 'menu', loadChildren: () =>import('../sys/menu/menu.module').then(mod => mod.MenuPageModule) },
  { path: 'config', loadChildren: () =>import('../sys/config/config.module').then(mod => mod.ConfigPageModule) },
  { path: 'log', loadChildren: () =>import('../sys/log/log.module').then(mod => mod.LogPageModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysRoutingModule { }
