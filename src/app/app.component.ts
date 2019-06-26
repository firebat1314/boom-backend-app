import { Component, ViewChild } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ApiService } from './providers/api.service';
import { StorageService } from './providers/storage/storage.service';
import { UtilsService } from './providers/utils/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];
  menuList;
  userName: any;
  userId: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private api: ApiService,
    private storage: StorageService,
    private navCtrl: NavController,
    private utils: UtilsService,
  ) {
    this.initializeApp();
  }

  accordions: Array<any> = [];


  onChange(event) {
    // console.log(event);
  }
  @ViewChild('title1') title1: ViewChild;

  ngOnInit() {
    this.accordions = [
      { title: this.title1, child: ['content 1', 'content 1', 'content 1'] },
      { title: `<img src="/assets/img/logo.svg" style="width:36px"/>`, child: ['content 2', 'content 2', 'content 2'], inactive: false },
      { title: 'Title 3', child: ['content 3', 'content 3', 'content 3'], inactive: true }
    ];
    this.api.menuNav().subscribe((data) => {
      if (data && data.code === 0) {
        let menuList = [];
        for (let i = 0, item = data.menuList; i < item.length; i++) {
          let child = []
          for (let j = 0, item1 = item[i].list; j < item1.length; j++) {
            child.push({
              title: item1[j].name,
              icon: `assets/svg/icon-${item1[j].icon}.svg`,
              menuId: item1[j].menuId,
              url: item1[j].url
            })
          }
          menuList.push({
            title: item[i].name,
            icon: `<ion-icon src="/assets/svg/icon-${item[i].icon}.svg" style="vertical-align: middle;margin-right: 6px;"></ion-icon><span style="vertical-align: middle;">${item[i].name}</span>`,
            menuId: item[i].menuId,
            child: child
          })
        }
        this.menuList = menuList;
        this.storage.setStorage('menuList', JSON.stringify(data.menuList || '[]'))
        this.storage.setStorage('permissions', JSON.stringify(data.permissions || '[]'))
        this.storage.setStorage('_id_', data._id_)
      } else {
        this.storage.setStorage('menuList', '[]')
        this.storage.setStorage('permissions', '[]')
        this.storage.setStorage('_id_', data._id_)
      }
    })
    this.api.userInfo().subscribe((data) => {
      if (data && data.code === 0) {
        this.userId = data.user.userId
        this.userName = data.user.username

        this.storage.setStorage('userInfo', data.user);
      }
    })
  }
  logout() {
    this.api.logout().subscribe(res => {
      this.storage.clearLoginInfo().subscribe(() => {
        this.navCtrl.navigateRoot('/login', { animated: true });
      });
    })
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}
