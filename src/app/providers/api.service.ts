import { Injectable } from '@angular/core';
import { HttpOptions, HttpService } from './http.service';
import { zip, from, of } from 'rxjs';
import { mergeMap, map, tap } from 'rxjs/operators';
import { StorageService } from './storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private storage: StorageService,
    private http: HttpService
  ) { }

  login(data?, options?: HttpOptions) {
    return zip(
      this.http.post('/sys/login', data, { showLoading: true, showToast: true, openDefultdata: true, ...options }),
    ).pipe(
      mergeMap(([res]) => {
        if (res.code === 0) {
          this.storage.isLogin = true;
          return zip(//必须等待token设置完成才能返回登录信息
            from(this.storage.setToken(res.token)),
          ).pipe(//
            map((token) => {
              // if (!token) this.myAlert.toast('token存储异常');
              return [res];
            })
          )
        }
        return of([res])
      }),
      tap(([res]) => {
        console.log(res)
      })
    );
  }
  logout(data = {}, options: HttpOptions = {}) {//退出登录
    return this.http.post('/sys/logout', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  menuNav(data = {}, options: HttpOptions = {}) {//导航列表
    return this.http.get('/sys/menu/nav', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  userInfo(data = {}, options: HttpOptions = {}) {//用户信息
    return this.http.get('/sys/user/info', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  online(data = {}, options: HttpOptions = {}) {//在线人数
    return this.http.get('/common/online', data, { showLoading: false, showToast: true, openDefultdata: true, ...options });
  }
  todayData(data = {}, options: HttpOptions = {}) {//数据表格
    return this.http.get('/common/today', data, { showLoading: false, showToast: true, openDefultdata: true, ...options });
  }
  diagram(data = {}, options: HttpOptions = {}) {//获取折线图列表
    return this.http.get('/common/diagram', data, { showLoading: false, showToast: true, openDefultdata: true, ...options });
  }
  searchByuaid(data = {}, options: HttpOptions = {}) {//游戏ID查询
    return this.http.get('/qry/user/list/uaid', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  searchByroleid(data = {}, options: HttpOptions = {}) {//账号ID查询
    return this.http.get('/qry/user/list/roleid', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  searchByAccount(data = {}, options: HttpOptions = {}) {//玩家账号查询
    return this.http.get('/qry/user/list/account', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  frozen(data = {}, options: HttpOptions = {}) {//冻结账号
    return this.http.get('/qry/user/frozen', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  unfrozen(data = {}, options: HttpOptions = {}) {//解冻账号
    return this.http.get('/qry/user/unfrozen', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  bindMobile(data = {}, options: HttpOptions = {}) {//绑定手机
    return this.http.get('/qry/user/bind', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  chgPwd(data = {}, options: HttpOptions = {}) {//修改密码
    return this.http.post('/qry/user/chgPwd', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  chgDeviceNo(data = {}, options: HttpOptions = {}) {//修改设备标识
    return this.http.get('/qry/user/chgDeviceNo', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  chgWithdraw(data = {}, options: HttpOptions = {}) {//修改提现信息
    return this.http.get('/qry/user/chgWithdraw', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  deduct(data = {}, options: HttpOptions = {}) {//扣除余额
    return this.http.get('/qry/user/deduct', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  bankdeduct(data = {}, options: HttpOptions = {}) {//扣除银行余额
    return this.http.get('/qry/user/bankdeduct', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  vipSet(data = {}, options: HttpOptions = {}) {//设置vip等级
    return this.http.get('/qry/user/vip/set', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  kickout(data = {}, options: HttpOptions = {}) {//提出游戏
    return this.http.get('/qry/user/kickout', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  forbidgames(data = {}, options: HttpOptions = {}) {//设置黑名单
    return this.http.get('/qry/user/forbidgames', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
}
