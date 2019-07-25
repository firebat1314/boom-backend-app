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
  /**
     * 日期对象转为日期字符串
     * @param date 需要格式化的日期对象
     * @param sFormat 输出格式,默认为yyyy-MM-dd                        年：y，月：M，日：d，时：h，分：m，秒：s
     * @example  dateFormat(new Date())                               "2017-02-28"
     * @example  dateFormat(new Date(),'yyyy-MM-dd')                  "2017-02-28"
     * @example  dateFormat(new Date(),'yyyy-MM-dd HH:mm:ss')         "2017-02-28 13:24:00"   ps:HH:24小时制
     * @example  dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss')         "2017-02-28 01:24:00"   ps:hh:12小时制
     * @example  dateFormat(new Date(),'hh:mm')                       "09:24"
     * @example  dateFormat(new Date(),'yyyy-MM-ddTHH:mm:ss+08:00')   "2017-02-28T13:24:00+08:00"
     * @example  dateFormat(new Date('2017-02-28 13:24:00'),'yyyy-MM-ddTHH:mm:ss+08:00')   "2017-02-28T13:24:00+08:00"
     * @returns {string}
     */
  dateFormat(date: Date, sFormat: String = 'yyyy-MM-dd'): string {
    let time = {
      Year: 0,
      TYear: '0',
      Month: 0,
      TMonth: '0',
      Day: 0,
      TDay: '0',
      Hour: 0,
      THour: '0',
      hour: 0,
      Thour: '0',
      Minute: 0,
      TMinute: '0',
      Second: 0,
      TSecond: '0',
      Millisecond: 0
    };
    time.Year = date.getFullYear();
    time.TYear = String(time.Year).substr(2);
    time.Month = date.getMonth() + 1;
    time.TMonth = time.Month < 10 ? "0" + time.Month : String(time.Month);
    time.Day = date.getDate();
    time.TDay = time.Day < 10 ? "0" + time.Day : String(time.Day);
    time.Hour = date.getHours();
    time.THour = time.Hour < 10 ? "0" + time.Hour : String(time.Hour);
    time.hour = time.Hour < 13 ? time.Hour : time.Hour - 12;
    time.Thour = time.hour < 10 ? "0" + time.hour : String(time.hour);
    time.Minute = date.getMinutes();
    time.TMinute = time.Minute < 10 ? "0" + time.Minute : String(time.Minute);
    time.Second = date.getSeconds();
    time.TSecond = time.Second < 10 ? "0" + time.Second : String(time.Second);
    time.Millisecond = date.getMilliseconds();

    return sFormat.replace(/yyyy/ig, String(time.Year))
      .replace(/yyy/ig, String(time.Year))
      .replace(/yy/ig, time.TYear)
      .replace(/y/ig, time.TYear)
      .replace(/MM/g, time.TMonth)
      .replace(/M/g, String(time.Month))
      .replace(/dd/ig, time.TDay)
      .replace(/d/ig, String(time.Day))
      .replace(/HH/g, time.THour)
      .replace(/H/g, String(time.Hour))
      .replace(/hh/g, time.Thour)
      .replace(/h/g, String(time.hour))
      .replace(/mm/g, time.TMinute)
      .replace(/m/g, String(time.Minute))
      .replace(/ss/ig, time.TSecond)
      .replace(/s/ig, String(time.Second))
      .replace(/fff/ig, String(time.Millisecond))
  }
}
