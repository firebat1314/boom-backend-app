import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MainPage } from './main.page';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
    {
        path: '',
        component: MainPage,
        children: [
            {
                path: 'home', loadChildren: '../home/home.module#HomePageModule'
            },
            {
                path: 'adv', loadChildren: '../module/adv/adv.module#AdvModule'
            },
            {
                path: 'cha', loadChildren: '../module/cha/cha.module#ChaModule'
            },
            {
                path: 'func', loadChildren: '../module/func/func.module#FuncModule'
            },
            {
                path: 'job', loadChildren: '../module/job/job.module#JobModule'
            },
            {
                path: 'mge', loadChildren: '../module/mge/mge.module#MgeModule'
            },
            {
                path: 'oss', loadChildren: '../module/oss/oss.module#OssModule'
            },
            {
                path: 'qry', loadChildren: '../module/qry/qry.module#QryModule'
            },
            {
                path: 'stats', loadChildren: '../module/stats/stats.module#StatsModule'
            },
            {
                path: 'sys', loadChildren: '../module/sys/sys.module#SysModule'
            },
            {
                path: 'game', loadChildren: '../module/game/game.module#GameModule'
            },
            {
                path: 'page404', loadChildren: '../page404/page404.module#Page404PageModule'
            },

            {
                path: '', redirectTo: 'home', pathMatch: 'full'
            },
            {
                path: '**', redirectTo: 'page404'
            },

        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        NgZorroAntdMobileModule,
        ComponentsModule
    ],
    declarations: [MainPage]
})
export class MainPageModule { }
