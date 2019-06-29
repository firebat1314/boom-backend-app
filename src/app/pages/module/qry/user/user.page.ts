import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/providers/alert/alert.service';
import { ApiService } from 'src/app/providers/api.service';
import { UtilsService } from 'src/app/providers/utils/utils.service';
import { IonSearchbar, ActionSheetController, AlertController, NavController, ModalController } from '@ionic/angular';
import { ForbidComponent } from './forbid/forbid.component';

@Component({
  selector: 'sss-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  @ViewChild(IonSearchbar) searchBar: IonSearchbar
  keyword = '35606';
  searchType = 'uaid';
  data: any;
  dataList: any = [];
  accountId: any;
  frozenVisible: false;
  pwdVisible: false;
  forbidVisible: false;
  chgWithdrawVisible: false;
  tradeVisible: false;
  gameForbid = {
    roleId: '',
    status: '0',
    point: 0,
    games: '',
    gamesArr: [],
  }
  constructor(
    private alert: AlertService,
    private apiServ: ApiService,
    private utils: UtilsService,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    public navCtrl: NavController,
    public modalController: ModalController
  ) { }


  ngOnInit() {
    this.getDataList();
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.searchBar.setFocus();
    }, 5000);
  }
  onSearchKeyUp(e: KeyboardEvent) {
    e.preventDefault();
    if ("Enter" == e.key) {

      this.getDataList();
    }
  }
  getDataList() {
    if (this.keyword.trim() === '') {
      this.alert.toast('请输入关键字')
      return
    }
    let foo: string;
    if (this.searchType = 'uaid') {
      foo = 'searchByuaid';
    } else if (this.searchType = 'roleid') {
      foo = 'searchByroleid';
    } else if (this.searchType = 'Account') {
      foo = 'searchByAccount';
    }
    this.apiServ[foo]({
      'keyword': this.keyword
    }).subscribe((data: any) => {
      if (data && data.code === 0) {
        let dataList = data.list;
        for (let i = 0; i < dataList.length; i++) {
          dataList[i].sumPay = dataList[i].sumPay / 100.0
          dataList[i].gold = dataList[i].gold / 100.0
          dataList[i].bankGold = dataList[i].bankGold / 100.0
          dataList[i].withdraw = dataList[i].withdraw / 100.0
          this.accountId = dataList[i].accountId;
          if (!dataList[i].gameForbid) {
            dataList[i].gameForbid = this.gameForbid;
            dataList[i].gameForbid.roleId = dataList[i].roleId;
          }
        }
        this.dataList = dataList;
      } else {
        this.dataList = []
      }
    })
  }
  async operateForUaid(user: any) {
    let buttons = [];
    user.forbid === 0 && buttons.push({
      text: '冻结账号',
      role: 'selected',
      handler: () => {
        this.frozenHandler(user.accountId);
      }
    });
    user.forbid === 1 && buttons.push({
      text: '解冻账号',
      role: 'selected',
      handler: () => {
        this.unfrozenHandler(user.roleId, user.forbidRemark);
      }
    });
    user.bind === 1 && buttons.push({
      text: '修改绑定手机',
      role: 'selected',
      handler: () => {
        this.bindHandler(user.accountId, user.bind);
      }
    });
    user.bind === 0 && buttons.push({
      text: '绑定手机',
      role: 'selected',
      handler: () => {
        this.bindHandler(user.accountId, user.bind);
      }
    });
    const actionSheet = await this.actionSheetController.create({
      header: '操作',
      buttons: [...buttons, {
        text: '修改密码',
        role: 'selected',
        handler: () => {
          this.pwdHandler(user.accountId);
        }
      }, {
        text: '修改设备标识',
        role: 'selected',
        handler: () => {
          this.chgDeviceNoHandler(user.accountId);
        }
      }, {
        text: '修改提现信息',
        role: 'selected',
        handler: () => {
          this.withdrawHandler(user.roleId);
        }
      }, {
        text: '取消',
        role: 'cancel',
        handler: () => {
          console.log('Play clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  async operateForRoleid(user: any) {
    const actionSheet = await this.actionSheetController.create({
      header: '操作',
      buttons: [{
        text: '扣除余额',
        role: 'selected',
        handler: () => {
          this.deductHandler(user.roleId);
        }
      }, {
        text: '扣除银行余额',
        role: 'selected',
        handler: () => {
          this.bankdeductHandler(user.roleId);
        }
      }, {
        text: '设置VIP等级',
        role: 'selected',
        handler: () => {
          this.setVupLvlHandler(user.roleId);
        }
      }, {
        text: '资金流查询',
        role: 'selected',
        handler: () => {
          this.tradeHandler(user.roleId);
        }
      }, {
        text: '取消',
        role: 'cancel',
        handler: () => {
          console.log('Play clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  async operateForAccount(user: any) {
    const actionSheet = await this.actionSheetController.create({
      header: '操作',
      buttons: [{
        text: '踢出游戏',
        role: 'selected',
        handler: () => {
          this.kickout(user.roleId);
        }
      }, {
        text: '设置游戏黑名单',
        role: 'selected',
        handler: () => {
          this.gamesForbid(user.roleId, user.gameForbid);
        }
      }, {
        text: '取消',
        role: 'cancel',
        handler: () => {
          console.log('Play clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  // 基本操作
  // 冻结
  async frozenHandler(accountId: any) {
    let auth = await this.utils.isAuth('qry:user:frozen');
    if (!auth) {
      return this.alert.toast("没有权限，请联系管理员授权");
    }
    let alert = await this.alertController.create({
      header: '冻结账号',
      message: '备注',
      inputs: [
        {
          name: 'frozen',
          type: 'text',
          placeholder: '请输入备注'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: '确定',
          handler: (e) => {
            this.apiServ.frozen({
              'ids': accountId,
              'remark': e.frozen
            }).subscribe(res => {
              if (res && res.code === 0) {
                this.alert.toast('操作成功');
                this.getDataList();
              }
            })
          }
        }
      ]
    })
    alert.present();
  }
  // 解冻
  async unfrozenHandler(id: any, remark: any) {
    if (!await this.utils.isAuth('qry:user:frozen')) {
      return this.alert.toast("没有权限，请联系管理员授权");
    }
    let alert = await this.alertController.create({
      header: '解冻账号',
      message: `此用户因为[${remark}]而被冻结，确认要解冻？`,
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: '确定',
          handler: (e) => {
            this.apiServ.unfrozen({
              'userId': id
            }).subscribe(res => {
              if (res && res.code === 0) {
                this.alert.toast('操作成功');
                this.getDataList();
              }
            })
          }
        }
      ]
    })
    alert.present();
  }
  // 绑定
  async bindHandler(accountId: any, isBind: number) {
    let auth = await this.utils.isAuth('qry:user:bind');
    if (!auth) {
      return this.alert.toast("没有权限，请联系管理员授权");
    }
    let alert = await this.alertController.create({
      header: isBind === 1 ? '修改手机' : '绑定手机',
      message: '请输入手机号',
      inputs: [
        {
          name: 'mobile',
          type: 'number',
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: '确定',
          handler: (e) => {
            if (!(/^1[3456789]\d{9}$/.test(e.mobile))) {
              this.alert.toast("请填写正确的手机号");
              return false;
            }
            this.apiServ.bindMobile({
              'accountId': accountId,
              'phone': e.mobile
            }).subscribe(res => {
              if (res && res.code === 0) {
                this.alert.toast('操作成功');
                this.getDataList();
              }
            })
          }
        }
      ]
    })
    alert.present();
  }
  // 改密
  async pwdHandler(accountId: string | string[]) {
    if (!await this.utils.isAuth('qry:user:chgPwd')) {
      return this.alert.toast("没有权限，请联系管理员授权");
    }
    let alert = await this.alertController.create({
      header: '修改密码',
      inputs: [
        {
          name: 'psw',
          type: 'text',
          placeholder: '请输入密码'
        }, {
          name: 'pswc',
          type: 'text',
          placeholder: '请确认密码'
        },
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: '确定',
          handler: (e) => {
            if (!/\S/.test(e.psw)) {
              this.alert.toast('确认密码不能为空');
              return false;
            } else if (e.psw !== e.pswc) {
              this.alert.toast('确认密码与密码输入不一致');
              return false;
            }
            this.apiServ.chgPwd(null, {
              params: {
                'accountId': accountId,
                'password': e.psw
              }
            }).subscribe(res => {
              if (res && res.code === 0) {
                this.alert.toast('操作成功');
                this.getDataList();
              }
            })
          }
        }
      ]
    })
    alert.present();
  }
  // 修改设备标识
  async chgDeviceNoHandler(accountId: string | string[]) {
    if (!await this.utils.isAuth('qry:user:chgDeviceNo')) {
      return this.alert.toast("没有权限，请联系管理员授权");
    }
    let alert = await this.alertController.create({
      header: '修改设备标识',
      inputs: [
        {
          name: 'deviceNo',
          type: 'text',
          placeholder: '请输入设备标识'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: '确定',
          handler: (e) => {
            if (!/^([a-zA-Z0-9_-])/.test(e.psw)) {
              this.alert.toast('请输入正确的设备标识');
              return false;
            }
            this.apiServ.chgDeviceNo({
              'accountId': accountId,
              'deviceNo': e.deviceNo
            }).subscribe(res => {
              if (res && res.code === 0) {
                this.alert.toast('操作成功');
                this.getDataList();
              }
            })
          }
        }
      ]
    })
    alert.present();
  }
  // 修改体现信息
  async withdrawHandler(roleId: string | string[]) {
    if (!await this.utils.isAuth('qry:user:chgWithdraw')) {
      return this.alert.toast("没有权限，请联系管理员授权");
    }
    let alert = await this.alertController.create({
      header: '修改提现信息',
      inputs: [
        {
          name: 'aliAccount',
          type: 'text',
          label: '支付宝账号',
          placeholder: '请输入支付宝账号'
        }, {
          name: 'aliName',
          type: 'text',
          placeholder: '请输入支付宝昵称'
        }, {
          name: 'cardNum',
          type: 'text',
          placeholder: '请输入银行卡账号'
        }, {
          name: 'cardName',
          type: 'text',
          placeholder: '请输入银行卡户名'
        },
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: '确定',
          handler: (e) => {
            this.apiServ.chgWithdraw({
              'roleId': roleId,
              'aliAccount': e.aliAccount,
              'aliName': e.aliName,
              'cardNum': e.cardNum,
              'cardName': e.cardName,
            }).subscribe(res => {
              if (res && res.code === 0) {
                this.alert.toast('操作成功');
                this.getDataList();
              }
            })
          }
        }
      ]
    })
    alert.present();
  }

  // 财富操作
  // 扣除余额
  async deductHandler(roleId: any) {
    if (!await this.utils.isAuth('qry:user:deduct')) {
      return this.alert.toast("没有权限，请联系管理员授权");
    }
    let alert = await this.alertController.create({
      header: '扣除余额',
      inputs: [
        {
          name: 'deduct',
          type: 'text',
          placeholder: '请输入扣除金额'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: '确定',
          handler: (e) => {
            if (!/^((0{1}\.\d+)|([1-9]\d*\.{1}\d+)|([1-9]+\d*))$/.test(e.deduct)) {
              this.alert.toast('金额只能为大于0的数字');
              return false;
            }
            this.apiServ.deduct({
              'roleId': roleId,
              'value': e.deduct
            }, { openDefultdata: false }).subscribe(res => {
              if (res && res.code === 0) {
                this.alert.toast('操作成功');
                this.getDataList();
              }
            })
          }
        }
      ]
    })
    alert.present();
  }
  // 扣除银行余额
  async bankdeductHandler(roleId: any) {
    if (!await this.utils.isAuth('qry:user:bankdeduct')) {
      return this.alert.toast("没有权限，请联系管理员授权");
    }
    let alert = await this.alertController.create({
      header: '扣除银行余额',
      inputs: [
        {
          name: 'value',
          type: 'text',
          placeholder: '请输入扣除金额'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: '确定',
          handler: (e) => {
            if (!/^((0{1}\.\d+)|([1-9]\d*\.{1}\d+)|([1-9]+\d*))$/.test(e.value)) {
              this.alert.toast('金额只能为大于0的数字');
              return false;
            }
            this.apiServ.bankdeduct({
              'roleId': roleId,
              'value': e.value
            }).subscribe(res => {
              if (res && res.code === 0) {
                this.alert.toast('操作成功');
                this.getDataList();
              }
            })
          }
        }
      ]
    })
    alert.present();
  }
  // 设置VIP等级
  async setVupLvlHandler(roleId: any) {
    if (!await this.utils.isAuth('qry:user:setVupLvl')) {
      return this.alert.toast("没有权限，请联系管理员授权");
    }
    let alert = await this.alertController.create({
      header: '设置VIP等级',
      inputs: [
        {
          name: 'value',
          type: 'text',
          placeholder: '请输入VIP等级'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: '确定',
          handler: (e) => {
            if (!/^(([0-9]+\d*))$/.test(e.value)) {
              this.alert.toast('VIP等级为不小于0的数字');
              return false;
            }
            this.apiServ.vipSet({
              'roleId': roleId,
              'vipLvl': e.value
            }).subscribe(res => {
              if (res && res.code === 0) {
                this.alert.toast('操作成功');
                this.getDataList();
              }
            })
          }
        }
      ]
    })
    alert.present();
  }
  // 资金流查询
  async tradeHandler(roleId: any) {
    if (!await this.utils.isAuth('qry:user:trade')) {
      return this.alert.toast("没有权限，请联系管理员授权");
    }
    this.navCtrl.navigateForward(['/qry/trade'], { queryParams: { roleId: roleId } });
  }
  // 踢出游戏
  async kickout(roleId: any) {
    if (!await this.utils.isAuth('qry:user:trade')) {
      return this.alert.toast("没有权限，请联系管理员授权");
    }
    let alert = await this.alertController.create({
      header: '踢出游戏',
      message: '确认要把该玩家踢出游戏？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: '确定',
          handler: () => {
            this.apiServ.kickout({
              'roleId': roleId,
            }).subscribe(res => {
              if (res && res.code === 0) {
                this.alert.toast('操作成功');
                this.getDataList();
              }
            })
          }
        }
      ]
    })
    alert.present();
  }
  //设置游戏黑名单
  async gamesForbid(roleId: any, gameForbid: any) {
    if (!await this.utils.isAuth('qry:user:trade')) {
      return this.alert.toast("没有权限，请联系管理员授权");
    }
    const modal = await this.modalController.create({
      component: ForbidComponent,
      componentProps: {
        roleId: roleId,
        gameForbid: gameForbid
      }
    });
    modal.onWillDismiss().then((res) => {
      if (res.data['dismissed']) {
        this.getDataList();
      }
    });

    return await modal.present();
  }
} 
