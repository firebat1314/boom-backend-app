import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRefresher, IonInfiniteScroll, IonContent, ModalController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/providers/api.service';
import { PopupService } from 'src/app/providers/popup/popup.service';
import { SearchPage } from './search/search.page';
import { HttpOptions } from 'src/app/providers/http.service';
import { map, finalize } from 'rxjs/operators';
import { UtilsService } from 'src/app/providers/utils/utils.service';

@Component({
  selector: 'sss-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {

  @ViewChild(IonRefresher) refresher: IonRefresher;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent) content: IonContent;
  formData = {
    'page': 1,
    'limit': 10,
    'keyword': '',
    'orderId': '',
    'outerOrderId': '',
    'status': '',
    'beginTime': '2019-05-08',
    'endTime': '2019-08-31',
    'payInfo': '',
    'orderBy': '',
    'sortMethod': ''
  }
  payInfoArr = [];//支付方式
  data: any;
  dataList: any;
  listServ: any;

  constructor(
    public modalController: ModalController,
    private route: ActivatedRoute,
    private apiServ: ApiService,
    private popupServ: PopupService,
    private alertCtrl: AlertController,
    public utilsServ: UtilsService,

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
        payInfoArr: this.payInfoArr
      }
    });
    modal.onWillDismiss().then(({ data }) => {
      if (data) {
        this.formData = data.formData;
        this.payInfoArr = data.payInfoArr;
        
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

  getDataList(data = {}, options?: HttpOptions) {

    return this.apiServ.payList(Object.assign(this.formData, data), options).pipe(
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
    if (!this.formData.beginTime || !this.formData.endTime) {
      this.refresher.complete();//ajax完成时、发生错误或者取消订阅时取消刷新
      this.popupServ.toast('请输入开始时间和结束时间');
      this.search();
      return false;
    }
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

  repairHandler(id, channelId) {
    if (channelId === 5
      || channelId === 21
      || channelId === 22
      || channelId === 25
      || channelId === 26
      || channelId === 33
      || channelId === 43
      || channelId === 44
      || channelId === 45
      || channelId === 46
      || channelId === 47
      || channelId === 48
      || channelId === 49
      || channelId === 55
      || channelId === 58
      || channelId === 61
      || channelId === 62
      || channelId === 64
      || channelId === 66
      || channelId === 67
      || channelId === 68
      || channelId === 69
      || channelId === 72
      || channelId === 73) {
      this.popupServ.toast('由于此渠道不支持订单状态查询，系统无法向此渠道查询此订单状态');
      return
    }
    this.apiServ.payRepair({}, { urlParam: id }).subscribe(res => {
      if (res && res.code === 0) {
        this.popupServ.toast('操作成功');
        this.doRefresh();
      }

    })
  }
  async caiwuRepairHandler(id, payMoney) {
    const alert = await this.alertCtrl.create({
      header: '提示',
      message: '您需要先向第三方支付确认已经[收款成功]并且[核对收款金额]才可以执行此操作，点击确定系统将直接下发金币给玩家，确定要补单吗？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: '确定',
          handler: () => {
            this.presentAlertPrompt(id, payMoney).then(res => {
              console.log(res)
            })
          }
        }
      ]
    });

    await alert.present();
  }
  async presentAlertPrompt(id, payMoney) {
    const alert = await this.alertCtrl.create({
      header: '提示',
      message: '请输入玩家支付金额',
      inputs: [
        {
          name: 'payMoney',
          type: 'text',
          placeholder: '',
          value: payMoney
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
            this.apiServ.payCaiwuRepair({}, {
              urlParam: id,
              params: {
                'payMoney': e.payMoney
              }
            }).subscribe(res => {
              if (res && res.code === 0) {
                this.popupServ.toast('操作成功').then(() => {
                  this.doRefresh();
                });
              }
            })
          }
        }
      ]
    });

    await alert.present();
  }
}
