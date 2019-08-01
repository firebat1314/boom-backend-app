import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, AlertController, IonRefresher, IonInfiniteScroll, IonContent } from '@ionic/angular';
import { PopupService } from 'src/app/providers/popup/popup.service';
import { ApiService } from 'src/app/providers/api.service';
import { HttpOptions } from 'src/app/providers/http.service';
import { map, finalize } from 'rxjs/operators';

@Component({
  selector: 'sss-success-order',
  templateUrl: './success-order.page.html',
  styleUrls: ['./success-order.page.scss'],
})
export class SuccessOrderPage implements OnInit {
  @ViewChild(IonRefresher, { static: false }) refresher: IonRefresher;
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent, { static: false }) content: IonContent;

  @Input() formData = {
    beginTime: '2019-04-01',
    endTime: '2019-07-01',
    channel: '',
    payType: '',
    payCh: '',
  };
  page = 1;
  limit = 10;

  listServ: any;
  dataList: any;
  data: any;

  constructor(
    public modalController: ModalController,
    private popupServ: PopupService,
    private apiServ: ApiService,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.doRefresh();
  }

  dismiss(data?: any) {
    this.modalController.dismiss(data);
  }

  getDataList(data = {}, options?: HttpOptions) {

    return this.apiServ.paySuccess({ ...this.formData, ...{ page: this.page, limit: this.limit }, ...data }, options).pipe(
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
        this.dataList = res.pageData.list;
      } else {
      }
    })
  }
  loadData(event: any) {
    let page = this.data.pageData.currPage;
    let pages = this.data.pageData.totalPage;
    if (this.data && page < pages) {
      this.listServ = this.getDataList({
        page: ++page,
      }, { showLoading: false }).subscribe(res => {
        if (res && res.code === 0) {
          this.dataList = [...this.dataList, ...res.pageData.list];
        } else {
        }
      })
    } else {
      event.target.disabled = true;
    }
  }
}
