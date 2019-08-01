import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRefresher, IonContent, ModalController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/providers/api.service';
import { PopupService } from 'src/app/providers/popup/popup.service';
import { UtilsService } from 'src/app/providers/utils/utils.service';
import { SearchPage } from './search/search.page';
import { HttpOptions } from 'src/app/providers/http.service';
import { map, finalize } from 'rxjs/operators';

@Component({
  selector: 'sss-keep',
  templateUrl: './keep.page.html',
  styleUrls: ['./keep.page.scss'],
})
export class KeepPage implements OnInit {

  @ViewChild(IonRefresher, { static: false }) refresher: IonRefresher;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  formData = {
    'page': 1,
    'limit': 10,
    'beginTime': '2019-05-08',
    'endTime': '2019-08-31',
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
    this.listServ = this.getDataList().subscribe(res => {
      if (res && res.code === 0) {
        this.dataList = res.list;
      }
    })
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
            this.content.scrollToTop(0);//搜索回调页面返回顶部
            this.dataList = res.list;
          } else {
          }
        });
      }
    });
    return await modal.present();
  }

  getDataList(data = {}, options?: HttpOptions) {

    return this.apiServ.statsKeep(Object.assign(this.formData, data), options).pipe(
      map((res: any) => {
        if (res && res.code === 0) {
          this.data = res;
        }
        return res;
      }),
      finalize(() => {
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
    }, { showLoading: false }).subscribe(res => {
      if (res && res.code === 0) {
        this.dataList = res.list;
      } else {
      }
    })
  }
  chartHandler(date) {

  }
}
