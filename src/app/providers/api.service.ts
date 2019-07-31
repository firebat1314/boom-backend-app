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
      this.http.post('/sys/login', data, options),
    ).pipe(
      mergeMap(([res]) => {
        if (res.code === 0) {
          this.storage.isLogin = true;
          return zip(//必须等待token设置完成才能返回登录信息
            from(this.storage.setToken(res.token)),
          ).pipe(//
            map((token) => {
              // if (!token) this.popupServ.toast('token存储异常');
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
    return this.http.post('/sys/logout', data, options);
  }
  menuNav(data = {}, options: HttpOptions = {}) {//导航列表
    return this.http.get('/sys/menu/nav', data, options);
  }
  userInfo(data = {}, options: HttpOptions = {}) {//用户信息
    return this.http.get('/sys/user/info', data, options);
  }
  online(data = {}, options: HttpOptions = {}) {//在线人数
    return this.http.get('/common/online', data, options);
  }
  todayData(data = {}, options: HttpOptions = {}) {//数据表格
    return this.http.get('/common/today', data, options);
  }
  diagram(data = {}, options: HttpOptions = {}) {//获取折线图列表
    return this.http.get('/common/diagram', data, options);
  }
  searchByuaid(data = {}, options: HttpOptions = {}) {//游戏ID查询
    return this.http.get('/qry/user/list/uaid', data, options);
  }
  searchByroleid(data = {}, options: HttpOptions = {}) {//账号ID查询
    return this.http.get('/qry/user/list/roleid', data, options);
  }
  searchByAccount(data = {}, options: HttpOptions = {}) {//玩家账号查询
    return this.http.get('/qry/user/list/account', data, options);
  }
  frozen(data = {}, options: HttpOptions = {}) {//冻结账号
    return this.http.get('/qry/user/frozen', data, options);
  }
  unfrozen(data = {}, options: HttpOptions = {}) {//解冻账号
    return this.http.get('/qry/user/unfrozen', data, options);
  }
  bindMobile(data = {}, options: HttpOptions = {}) {//绑定手机
    return this.http.get('/qry/user/bind', data, options);
  }
  chgPwd(data = {}, options: HttpOptions = {}) {//修改密码
    return this.http.post('/qry/user/chgPwd', data, options);
  }
  chgDeviceNo(data = {}, options: HttpOptions = {}) {//修改设备标识
    return this.http.get('/qry/user/chgDeviceNo', data, options);
  }
  chgWithdraw(data = {}, options: HttpOptions = {}) {//修改提现信息
    return this.http.get('/qry/user/chgWithdraw', data, options);
  }
  deduct(data = {}, options: HttpOptions = {}) {//扣除余额
    return this.http.get('/qry/user/deduct', data, options);
  }
  bankdeduct(data = {}, options: HttpOptions = {}) {//扣除银行余额
    return this.http.get('/qry/user/bankdeduct', data, options);
  }
  vipSet(data = {}, options: HttpOptions = {}) {//设置vip等级
    return this.http.get('/qry/user/vip/set', data, options);
  }
  kickout(data = {}, options: HttpOptions = {}) {//提出游戏
    return this.http.get('/qry/user/kickout', data, options);
  }
  forbidgames(data = {}, options: HttpOptions = {}) {//设置黑名单
    return this.http.post('/qry/user/forbidgames', data, options);
  }
  gameList(data = {}, options: HttpOptions = {}) {//游戏查询
    return this.http.get('/qry/game/list', data, options);
  }
  gameType(data = {}, options: HttpOptions = {}) {//游戏类型
    return this.http.get('/qry/game/type', data, options);
  }
  gameDetail(data = {}, options: HttpOptions = {}) {//游戏详情
    return this.http.get('/qry/game/detail', data, options);
  }
  baoInfo(data = {}, options: HttpOptions = {}) {//畅玩宝查询
    return this.http.get('/qry/bao/info', data, options);
  }
  baoBorrow(data = {}, options: HttpOptions = {}) {//查询借款
    return this.http.get('/qry/bao/borrow', data, options);
  }
  baoDeposit(data = {}, options: HttpOptions = {}) {//查询存款
    return this.http.get('/qry/bao/list/deposit', data, options);
  }
  getDataListByUAId(data = {}, options: HttpOptions = {}) {//资金流 ID查询
    return this.http.get('/qry/trade/list/aid', data, options);
  }
  getDataListByRoleId(data = {}, options: HttpOptions = {}) {//资金流 游戏ID查询
    return this.http.get('/qry/trade/list/rid', data, options);
  }
  getDataListByAccount(data = {}, options: HttpOptions = {}) {//资金流 玩家账号查询
    return this.http.get('/qry/trade/list/act', data, options);
  }
  bankList(data = {}, options: HttpOptions = {}) {//银行查询
    return this.http.get('/qry/bank/list', data, options);
  }
  exchgList(data = {}, options: HttpOptions = {}) {//提现查询
    return this.http.get('/qry/exchg/list', data, options);
  }
  exchgInfo(data = {}, options: HttpOptions = {}) {//提现状态跟踪
    return this.http.get('/qry/exchg/info', data, options);
  }
  payList(data = {}, options: HttpOptions = {}) {//存款查询
    return this.http.get('/qry/pay/list', data, options);
  }
  payCaiwuRepair(data = {}, options: HttpOptions = {}) {//补单
    return this.http.put('/qry/pay/caiwuRepair', data, options);
  }
  payRepair(data = {}, options: HttpOptions = {}) {//补单
    return this.http.put('/qry/pay/repair', data, options);
  }
  payInfoList(data = {}, options: HttpOptions = {}) {//支付方式
    return this.http.get('/qry/pay/list/payInfo', data, options);
  }
  mailList(data = {}, options: HttpOptions = {}) {//邮件查询
    return this.http.get('/qry/mail/list', data, options);
  }
  mailFrozen(data = {}, options: HttpOptions = {}) {//冻结
    return this.http.put('/qry/mail/frozen', data, options);
  }
  agentList(data = {}, options: HttpOptions = {}) {//代理查询
    return this.http.get('/qry/agent/list', data, options);
  }
  agentAddBalance(data = {}, options: HttpOptions = {}) {//存款
    return this.http.post('/qry/agent/addBalance', data, options);
  }
  agentFrozen(data = {}, options: HttpOptions = {}) {//冻结
    return this.http.put('/qry/agent/frozen', data, options);
  }
  agentResetPwd(data = {}, options: HttpOptions = {}) {//重置密码
    return this.http.post('/qry/agent/resetPwd', data, options);
  }
  agentInfo(data = {}, options: HttpOptions = {}) {//
    return this.http.get('/qry/agent/info', data, options);
  }
  statsProfit(data = {}, options: HttpOptions = {}) {//分润统计
    return this.http.get('/stats/profit', data, options);
  }
  statsGoldChgRank(data = {}, options: HttpOptions = {}) {//输赢提现排行
    return this.http.get('/stats/goldChgRank', data, options);
  }
  operateChannel(data = {}, options: HttpOptions = {}) {//获得channel信息
    return this.http.get('/stats/operate/getChannel', data, options);
  }
  operateList(data = {}, options: HttpOptions = {}) {//运营数据统计
    return this.http.get('/stats/operate/list', data, options);
  }
  statsGame(data = {}, options: HttpOptions = {}) {//游戏统计
    return this.http.get('/stats/game', data, options);
  }
  statsChannel(data = {}, options: HttpOptions = {}) {//获取渠道选项
    return this.http.get('/stats/getChannel', data, options);
  }
  statsOnline(data = {}, options: HttpOptions = {}) {//在线人数
    return this.http.get('/stats/online', data, options);
  }
  payListInfo(data = {}, options: HttpOptions = {}) {//存款统计
    return this.http.get('/qry/pay/list/payInfo', data, options);
  }
  paySuccess(data = {}, options: HttpOptions = {}) {//获取成功订单
    return this.http.get('/stats/pay', data, options);
  }
  payStatsList(data = {}, options: HttpOptions = {}) {//存款统计列表
    return this.http.get('/stats/list', data, options);
  }
  statsCoin(data = {}, options: HttpOptions = {}) {//货币统计
    return this.http.get('/stats/coin', data, options);
  }
  statsExchg(data = {}, options: HttpOptions = {}) {//提现统计
    return this.http.get('/stats/exchg', data, options);
  }
  statsExchgChannel(data = {}, options: HttpOptions = {}) {//渠道信息
    return this.http.get('/stats/exchg/getChannel', data, options);
  }
  statsUser(data = {}, options: HttpOptions = {}) {//用户统计
    return this.http.get('/stats/user', data, options);
  }
  statsUserChannel(data = {}, options: HttpOptions = {}) {//渠道信息
    return this.http.get('/stats/user/getChannel', data, options);
  }
  statsTax(data = {}, options: HttpOptions = {}) {//抽水统计
    return this.http.get('/stats/tax', data, options);
  }
  statsKeep(data = {}, options: HttpOptions = {}) {//注册留存统计
    return this.http.get('/stats/keep', data, options);
  }
  statsKeepDetail(data = {}, options: HttpOptions = {}) {//注册留存统计详情
    return this.http.get('/stats/keep/detail', data, options);
  }
  statsFlow(data = {}, options: HttpOptions = {}) {//游戏流水统计
    return this.http.get('/stats/flow', data, options);
  }
  statsWadvSalary(data = {}, options: HttpOptions = {}) {//佣金流水排行统计--
    return this.http.get('/stats/wadv/salary', data, options);
  }
  statsWadvChild(data = {}, options: HttpOptions = {}) {//会员排行统计-----
    return this.http.get('/stats/wadv/child', data, options);
  }
  statsFirst(data = {}, options: HttpOptions = {}) {//注册首冲统计-
    return this.http.get('/stats/first', data, options);
  }
  statsChfirst(data = {}, options: HttpOptions = {}) {//详情-
    return this.http.get('/stats/chfirst', data, options);
  }
  funcMailList(data = {}, options: HttpOptions = {}) {//全部邮件列表
    return this.http.get('/func/mail/global/list', data, options);
  }
  funcMailTarget(data = {}, options: HttpOptions = {}) {//发送邮件-
    return this.http.post('/func/mail/target', data, options);
  }
  funcMailGlobal(data = {}, options: HttpOptions = {}) {//全局发送
    return this.http.post('/func/mail/global', data, options);
  }
  funcReplyList(data = {}, options: HttpOptions = {}) {//咨询回复
    return this.http.get('/func/reply/list', data, options);
  }
  funcMailInfo(data = {}, options: HttpOptions = {}) {//邮件详情
    return this.http.get('/func/mail/info', data, options);
  }
  gameChannel(data = {}, options: HttpOptions = {}) {//游戏配置管理
    return this.http.get('/game/getChannel', data, options);
  }
  gameSort(data = {}, options: HttpOptions = {}) {//游戏配置管理排序
    return this.http.get('/game/getSort', data, options);
  }
  gameEditSort(data = {}, options: HttpOptions = {}) {//游戏配置管理修改排序
    return this.http.get('/game/sort', data, options);
  }
  gameData(data = {}, options: HttpOptions = {}) {//游戏配置管理网址修改
    return this.http.get('/game/web/getDate', data, options);
  }
  gameAdmin(data = {}, options: HttpOptions = {}) {//游戏配置管理网址修改
    return this.http.get('/cha/admin/official', data, options);
  }
  funcData(data = {}, options: HttpOptions = {}) {//功能管理
    return this.http.get('/game/func/getData', data, options);
  }
  funcManage(data = {}, options: HttpOptions = {}) {//功能管理
    return this.http.get('/game/func/funcManage', data, options);
  }
  giveData(data = {}, options: HttpOptions = {}) {//z赠送管理
    return this.http.get('/game/give/getDate', data, options);
  }
  sysUserList(data = {}, options: HttpOptions = {}) {//管理员列表
    return this.http.get('/sys/user/list', data, options);
  }
  sysUserDelete(data = {}, options: HttpOptions = {}) {//管理员删除
    return this.http.post('/sys/user/delete', data, options);
  }
  sysUserChannels(data = {}, options: HttpOptions = {}) {//新增管理员 渠道
    return this.http.get('/sys/user/channels', data, options);
  }
  sysUserSave(data = {}, options: HttpOptions = {}) {//新增管理员 
    return this.http.post('/sys/user/save', data, options);
  }
  sysUserUpdate(data = {}, options: HttpOptions = {}) {//修改管理员
    return this.http.post('/sys/user/update', data, options);
  }
  sysUserInfo(data = {}, options: HttpOptions = {}) {//管理员信息
    return this.http.get('/sys/user/info', data, options);
  }
  sysRoleSelect(data = {}, options: HttpOptions = {}) {//角色权限
    return this.http.get('/sys/role/select', data, options);
  }
}