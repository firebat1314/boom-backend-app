import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/providers/api.service';
import { StorageService } from 'src/app/providers/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class MenuListService {
  menuList: Array<any> = [];
  userName: any;
  userId: any;
  constructor(
    private api: ApiService,
    private storage: StorageService,
  ) {
    this.gitMenuList();
    this.getUserInfo();
  }
  gitMenuList() {
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
  }
  getUserInfo() {
    this.api.userInfo().subscribe((data) => {
      if (data && data.code === 0) {
        this.userId = data.user.userId
        this.userName = data.user.username
        this.storage.setStorage('userInfo', data.user);
      }
    })
  }
}
