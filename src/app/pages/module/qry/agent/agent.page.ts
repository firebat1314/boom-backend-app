import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRefresher, IonInfiniteScroll, IonContent, ModalController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/providers/api.service';
import { PopupService } from 'src/app/providers/popup/popup.service';
import { SearchPage } from './search/search.page';
import { HttpOptions } from 'src/app/providers/http.service';
import { map, finalize } from 'rxjs/operators';
import { UtilsService } from 'src/app/providers/utils/utils.service';
import { AddOrUpdatePage } from './add-or-update/add-or-update.page';

@Component({
  selector: 'sss-agent',
  templateUrl: './agent.page.html',
  styleUrls: ['./agent.page.scss'],
})
export class AgentPage implements OnInit {

  @ViewChild(IonRefresher) refresher: IonRefresher;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent) content: IonContent;
  formData = {
    page: 1,
    limit: 10,
    keyword: '',
  }
  data: any;
  dataList: any;
  listServ: any;

  addOrUpdateResponse: any;

  constructor(
    public modalController: ModalController,
    private route: ActivatedRoute,
    private apiServ: ApiService,
    private popupServ: PopupService,
    private alertCtrl: AlertController,
    private utilsServ: UtilsService,
  ) { }

  ngOnInit() {

  }

  //搜索弹窗
  async search() {
    let formData = this.formData;
    formData.page = 1;

    const modal = await this.modalController.create({
      component: SearchPage,
      componentProps: {
        formData: formData,
      }
    });
    modal.onWillDismiss().then(({ data }) => {
      if (data) {
        this.formData = data;
        this.listServ && this.listServ.unsubscribe();//取消搜索之前的接口请求
        this.listServ = this.getDataList().subscribe((res) => {
          if (res && res.code === 0) {
            this.infiniteScroll.disabled = false;
            this.content.scrollToTop(0);//搜索回调页面返回顶部
            this.dataList = res.page.list;
          } else {
          }
        });
      }
    });
    return await modal.present();
  }

  async addOrUpdateHandler(id?) {
    const modal = await this.modalController.create({
      component: AddOrUpdatePage,
      componentProps: {
        id: id,
        flag: 'agent',
      }
    });
    modal.onWillDismiss().then(({ data }) => {
      if (data) {
        this.addOrUpdateResponse = data;
        this.listServ && this.listServ.unsubscribe();//取消弹窗之前的接口请求
        this.listServ = this.getDataList().subscribe((res) => {
          if (res && res.code === 0) {
            this.infiniteScroll.disabled = false;
            this.content.scrollToTop(0);//搜索回调页面返回顶部
            this.dataList = res.page.list;
          } else {
          }
        });
      }
    });
    return await modal.present();
  }

  getDataList(data = {}, options?: HttpOptions) {

    return this.apiServ.agentList(Object.assign(this.formData, data), options).pipe(
      map((res: any) => {
        if (res && res.code === 0) {
          this.data = res;
        }
        return res;
      }),
      finalize(() => {
        this.infiniteScroll.complete();//ajax完成时、发生错误或者取消订阅时取消加载
        this.refresher.complete();//ajax完成时、发生错误或者取消订阅时取消刷新
      })
    )
  }

  doRefresh(event?: any) {

    this.listServ = this.getDataList({
      page: 1,
    }, { showLoading: false }).subscribe(res => {
      if (res && res.code === 0) {
        this.infiniteScroll.disabled = false;
        this.dataList = res.page.list;
      } else {
      }
    })
  }
  loadData(event: any) {
    let page = this.data.page.currPage;
    let pages = this.data.page.totalPage;
    if (this.data && page < pages) {
      this.listServ = this.getDataList({
        page: ++page,
      }, { showLoading: false }).subscribe(res => {
        if (res && res.code === 0) {
          this.dataList = [...this.dataList, ...res.page.list];
        } else {
        }
      })
    } else {
      event.target.disabled = true;
    }
  }
  async addBalanceHandler(id) {
    if (!this.utilsServ.isAuth('qry:agent:addBalance')) {
      this.popupServ.toast('没有权限');
      return false;
    }
    let alert = await this.alertCtrl.create({
      header: '存款',
      inputs: [
        {
          name: 'val',
          type: 'number',
          placeholder: '金额（元）'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: '确定',
          handler: (e) => {
            this.apiServ.agentFrozen({}, {
              params: {
                'id': id,
                'val': e.val * 100 + ""
              }
            }).subscribe(res => {
              if (res && res.code === 0) {
                this.popupServ.toast('操作成功');
                this.doRefresh();
              }
            })
          }
        }
      ]
    })
    alert.present();
  }
  async resetHandler(id) {
    if (!this.utilsServ.isAuth('qry:agent:resetPwd')) {
      this.popupServ.toast('没有权限');
      return false;
    }
    let alert = await this.alertCtrl.create({
      header: '冻结',
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: '密码'
        }, {
          name: 'comfirmPassword',
          type: 'password',
          placeholder: '确认密码'
        },
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: '确定',
          handler: (e) => {
            if (!/\S/.test(e.password)) {
              this.popupServ.toast('密码不能为空');
              return
            }
            if (!/\S/.test(e.comfirmPassword)) {
              this.popupServ.toast('确认密码不能为空');
              return
            } else if (e.password !== e.comfirmPassword) {
              this.popupServ.toast('确认密码与密码输入不一致');
              return
            }
            this.apiServ.agentResetPwd({}, {
              params: {
                'userId': id,
                'password': e.password,
              }
            }).subscribe(res => {
              if (res && res.code === 0) {
                this.popupServ.toast('操作成功');
                this.doRefresh();
              }
            })
          }
        }
      ]
    })
    alert.present();
  }
  async frozenHandler(id, status, remark) {

    if (!this.utilsServ.isAuth('qry:agent:frozen')) {
      this.popupServ.toast('没有权限');
      return false;
    }
    if (status === 0) {

      let alert = await this.alertCtrl.create({
        header: '冻结',
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
          }, {
            text: '确定',
            handler: (e) => {
              this.apiServ.agentFrozen({}, {
                params: {
                  'id': id,
                  'status': '0',
                  'remark': e.frozen
                }
              }).subscribe(res => {
                if (res && res.code === 0) {
                  this.popupServ.toast('操作成功');
                  this.doRefresh();
                }
              })
            }
          }
        ]
      })
      alert.present();
    } else {
      let alert = await this.alertCtrl.create({
        header: '提示',
        message: `此用户因为[${remark}]而被冻结，确认要解冻？`,
        buttons: [
          {
            text: '取消',
            role: 'cancel',
            cssClass: 'secondary',
          }, {
            text: '确定',
            handler: (e) => {
              this.apiServ.agentFrozen({}, {
                params: {
                  'id': id,
                  'status': '1',
                }
              }).subscribe(res => {
                if (res && res.code === 0) {
                  this.popupServ.toast('操作成功');
                  this.doRefresh();
                }
              })
            }
          }
        ]
      })
      alert.present();
    }

  }
}
