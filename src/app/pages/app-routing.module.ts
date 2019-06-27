import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'page404', loadChildren: './page404/page404.module#Page404PageModule' },

  {
    path: 'adv', children: [
      { path: '', loadChildren: './module/adv/adv.module#AdvModule' }
    ]
  },
  {
    path: 'cha', children: [
      { path: '', loadChildren: './module/cha/cha.module#ChaModule' }
    ]
  },
  {
    path: 'func', children: [
      { path: '', loadChildren: './module/func/func.module#FuncModule' }
    ]
  },
  {
    path: 'job', children: [
      { path: '', loadChildren: './module/job/job.module#JobModule' }
    ]
  },
  {
    path: 'mge', children: [
      { path: '', loadChildren: './module/mge/mge.module#MgeModule' }
    ]
  },
  {
    path: 'oss', children: [
      { path: '', loadChildren: './module/oss/oss.module#OssModule' }
    ]
  },
  {
    path: 'qry', children: [
      { path: '', loadChildren: './module/qry/qry.module#QryModule' }
    ]
  },
  {
    path: 'stats', children: [
      { path: '', loadChildren: './module/stats/stats.module#StatsModule' }
    ]
  },
  {
    path: 'sys', children: [
      { path: '', loadChildren: './module/sys/sys.module#SysModule' }
    ]
  },

  { path: '**', redirectTo: '/page404' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
