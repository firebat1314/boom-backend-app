import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'module',
    loadChildren: () => import('./main/main.module').then(mod => mod.MainPageModule)
  },
  { path: 'login', loadChildren: () => import('./login/login.module').then(mod => mod.LoginPageModule) },
  { path: 'page404', loadChildren: () => import('./page404/page404.module').then(mod => mod.Page404PageModule) },

  { path: '', redirectTo: '/module/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/page404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      enableTracing: false // <-- debugging purposes only
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
