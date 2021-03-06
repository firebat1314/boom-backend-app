import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRefresher, IonInfiniteScroll, IonContent, ModalController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/providers/api.service';
import { PopupService } from 'src/app/providers/popup/popup.service';
import { SearchPage } from './search/search.page';
import { HttpOptions } from 'src/app/providers/http.service';
import { map, finalize } from 'rxjs/operators';

@Component({
  selector: 'sss-exchg',
  templateUrl: './exchg.page.html',
  styleUrls: ['./exchg.page.scss'],
})
export class ExchgPage implements OnInit {


  @ViewChild(IonRefresher, { static: false }) refresher: IonRefresher;
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  formData = {
    page: 1,
    limit: 10,
    keyword: '',
    beginTime: '2019-05-08',
    endTime: '2019-08-31',
    type: '',
    channel: '',
    status: '',
  }
  data: any;
  dataList: any;
  listServ: any;

  constructor(
    public modalController: ModalController,
    private route: ActivatedRoute,
    private apiServ: ApiService,
    private popupServ: PopupService,
    public navCtrl: NavController,
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

  getDataList(data = {}, options?: HttpOptions) {

    return this.apiServ.exchgList(Object.assign(this.formData, data), options).pipe(
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
  trackHandler(id: any) {
    this.navCtrl.navigateForward(['qry/exchg/track', id]);
  }
}
