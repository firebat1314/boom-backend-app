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

  menuList: Array<any> = [];
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

  onChange(event) {
    // console.log(event);
  }

  ngOnInit() {
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
              url: '/' + item1[j].url
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
