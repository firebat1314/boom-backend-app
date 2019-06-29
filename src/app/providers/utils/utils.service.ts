import { Injectable } from '@angular/core';
import { zip, from } from 'rxjs';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  injector: any;

  constructor(
    private storage: StorageService,
  ) { }

  /**
   * 获取uuid
   */
  getUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    })
  }

  /**
   * 是否有权限
   * @param {*} key
   */
  async isAuth(key: any) {
    const data = await this.storage.getStorage('permissions');
    return JSON.parse(data || '[]').indexOf(key) !== -1 || false;
  }

  async isAdmin() {
    const data = await this.storage.getStorage('_id_');
    return data.toString() === '1';
  }

  /**
   * 树形数据转换
   * @param {*} data
   * @param {*} id
   * @param {*} pid
   */
  treeDataTranslate(data: any, id: any = 'id', pid: any = 'parentId') {
    var res = []
    var temp = {}
    for (var i = 0; i < data.length; i++) {
      temp[data[i][id]] = data[i]
    }
    for (var k = 0; k < data.length; k++) {
      if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
        if (!temp[data[k][pid]]['children']) {
          temp[data[k][pid]]['children'] = []
        }
        if (!temp[data[k][pid]]['_level']) {
          temp[data[k][pid]]['_level'] = 1
        }
        data[k]['_level'] = temp[data[k][pid]]._level + 1
        temp[data[k][pid]]['children'].push(data[k])
      } else {
        res.push(data[k])
      }
    }
    return res
  }

  /**
   * 邮箱
   * @param {*} s
   */
  isEmail(s: any) {
    return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
  }

  /**
   * 手机号码
   * @param {*} s
   */
  isMobile(s: any) {
    return /^1[0-9]{10}$/.test(s)
  }

  /**
   * 电话号码
   * @param {*} s
   */
  isPhone(s: string) {
    return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
  }

  /**
   * URL地址
   * @param {*} s
   */
  isURL(s: any) {
    return /^http[s]?:\/\/.*/.test(s)
  }

  /**
   * AccountId
   * @param {*} s
   */
  isAccountId(s: any) {
    return /^[0-9]{5,10}$/.test(s)
  }
}
