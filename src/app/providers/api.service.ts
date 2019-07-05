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

  login(data = {}, options: HttpOptions = {}) {
    return zip(
      this.http.post(options.url || '/sys/login', data, { showLoading: true, showToast: true, openDefultdata: true, ...options }),
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
    return this.http.post(options.url || '/sys/logout', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  menuNav(data = {}, options: HttpOptions = {}) {//导航列表
    return this.http.get(options.url || '/sys/menu/nav', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  userInfo(data = {}, options: HttpOptions = {}) {//用户信息
    return this.http.get(options.url || '/sys/user/info', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  online(data = {}, options: HttpOptions = {}) {//在线人数
    return this.http.get(options.url || '/common/online', data, { showLoading: false, showToast: true, openDefultdata: true, ...options });
  }
  todayData(data = {}, options: HttpOptions = {}) {//数据表格
    return this.http.get(options.url || '/common/today', data, { showLoading: false, showToast: true, openDefultdata: true, ...options });
  }
  diagram(data = {}, options: HttpOptions = {}) {//获取折线图列表
    return this.http.get(options.url || '/common/diagram', data, { showLoading: false, showToast: true, openDefultdata: true, ...options });
  }
  searchByuaid(data = {}, options: HttpOptions = {}) {//游戏ID查询
    return this.http.get(options.url || '/qry/user/list/uaid', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  searchByroleid(data = {}, options: HttpOptions = {}) {//账号ID查询
    return this.http.get(options.url || '/qry/user/list/roleid', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  searchByAccount(data = {}, options: HttpOptions = {}) {//玩家账号查询
    return this.http.get(options.url || '/qry/user/list/account', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  frozen(data = {}, options: HttpOptions = {}) {//冻结账号
    return this.http.get(options.url || '/qry/user/frozen', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  unfrozen(data = {}, options: HttpOptions = {}) {//解冻账号
    return this.http.get(options.url || '/qry/user/unfrozen', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  bindMobile(data = {}, options: HttpOptions = {}) {//绑定手机
    return this.http.get(options.url || '/qry/user/bind', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  chgPwd(data = {}, options: HttpOptions = {}) {//修改密码
    return this.http.post(options.url || '/qry/user/chgPwd', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  chgDeviceNo(data = {}, options: HttpOptions = {}) {//修改设备标识
    return this.http.get(options.url || '/qry/user/chgDeviceNo', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  chgWithdraw(data = {}, options: HttpOptions = {}) {//修改提现信息
    return this.http.get(options.url || '/qry/user/chgWithdraw', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  deduct(data = {}, options: HttpOptions = {}) {//扣除余额
    return this.http.get(options.url || '/qry/user/deduct', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  bankdeduct(data = {}, options: HttpOptions = {}) {//扣除银行余额
    return this.http.get(options.url || '/qry/user/bankdeduct', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  vipSet(data = {}, options: HttpOptions = {}) {//设置vip等级
    return this.http.get(options.url || '/qry/user/vip/set', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  kickout(data = {}, options: HttpOptions = {}) {//提出游戏
    return this.http.get(options.url || '/qry/user/kickout', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  forbidgames(data = {}, options: HttpOptions = {}) {//设置黑名单
    return this.http.post(options.url || '/qry/user/forbidgames', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  gameList(data = {}, options: HttpOptions = {}) {//游戏查询
    return this.http.get(options.url || '/qry/game/list', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  gameType(data = {}, options: HttpOptions = {}) {//游戏类型
    return this.http.get(options.url || '/qry/game/type', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  gameDetail(data = {}, options: HttpOptions = {}) {//游戏详情
    return this.http.get(options.url || '/qry/game/detail', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  baoInfo(data = {}, options: HttpOptions = {}) {//畅玩宝查询
    return this.http.get(options.url || '/qry/bao/info', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  baoBorrow(data = {}, options: HttpOptions = {}) {//查询借款
    return this.http.get(options.url || '/qry/bao/borrow', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  baoDeposit(data = {}, options: HttpOptions = {}) {//查询存款
    return this.http.get(options.url || '/qry/bao/list/deposit', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  getDataListByUAId(data = {}, options: HttpOptions = {}) {//资金流 ID查询
    return this.http.get(options.url || '/qry/trade/list/aid', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  getDataListByRoleId(data = {}, options: HttpOptions = {}) {//资金流 游戏ID查询
    return this.http.get(options.url || '/qry/trade/list/rid', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  getDataListByAccount(data = {}, options: HttpOptions = {}) {//资金流 玩家账号查询
    return this.http.get(options.url || '/qry/trade/list/act', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  bankList(data = {}, options: HttpOptions = {}) {//银行查询
    return this.http.get(options.url || '/qry/bank/list', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  baexchgList(data = {}, options: HttpOptions = {}) {//提现查询
    return this.http.get(options.url || '/qry/exchg/list', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
}