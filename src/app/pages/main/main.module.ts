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
                path: '', redirectTo: 'home', pathMatch: 'full'
            },
            {
                path: 'home', loadChildren: () =>import('../home/home.module').then(mod => mod.HomePageModule)
            },
            {
                path: 'adv', loadChildren: () =>import('../module/adv/adv.module').then(mod => mod.AdvModule)
            },
            {
                path: 'cha', loadChildren: () =>import('../module/cha/cha.module').then(mod => mod.ChaModule)
            },
            {
                path: 'func', loadChildren: () =>import('../module/func/func.module').then(mod => mod.FuncModule)
            },
            {
                path: 'job', loadChildren: () =>import('../module/job/job.module').then(mod => mod.JobModule)
            },
            {
                path: 'mge', loadChildren: () =>import('../module/mge/mge.module').then(mod => mod.MgeModule)
            },
            {
                path: 'oss', loadChildren: () =>import('../module/oss/oss.module').then(mod => mod.OssModule)
            },
            {
                path: 'qry', loadChildren: () =>import('../module/qry/qry.module').then(mod => mod.QryModule)
            },
            {
                path: 'stats', loadChildren: () =>import('../module/stats/stats.module').then(mod => mod.StatsModule)
            },
            {
                path: 'sys', loadChildren: () =>import('../module/sys/sys.module').then(mod => mod.SysModule)
            },
            {
                path: 'game', loadChildren: () =>import('../module/game/game.module').then(mod => mod.GameModule)
            },
            {
                path: 'page404', loadChildren: () =>import('../page404/page404.module').then(mod => mod.Page404PageModule)
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
