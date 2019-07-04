import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRefresher, IonInfiniteScroll, IonContent, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/providers/api.service';
import { AlertService } from 'src/app/providers/alert/alert.service';
import { SearchPage } from './search/search.page';
import { HttpOptions } from 'src/app/providers/http.service';
import { map, finalize } from 'rxjs/operators';

@Component({
  selector: 'sss-trade',
  templateUrl: './trade.page.html',
  styleUrls: ['./trade.page.scss'],
})
export class TradePage implements OnInit {

  @ViewChild(IonRefresher) refresher: IonRefresher;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent) content: IonContent;
  formData = {
    page: 1,
    limit: 10,
    keyword: '35606',
    searchType: 'uaid',
    beginTime: '2019-05-08',
    endTime: '2019-08-31'
  }
  data: any;
  dataList: any;
  listServ: any;

  constructor(
    public modalController: ModalController,
    private route: ActivatedRoute,
    private apiServ: ApiService,
    public alert: AlertService,
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      if (params.get('roleId')) {//游戏id查询
        this.formData.searchType = 'roleid';
        this.formData.keyword = params.get('roleId');
        this.doRefresh();
      }
    });
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
    let api = '';
    if (this.formData.searchType == 'uaid') {//ID查询
      api = 'getDataListByUAId';
    }
    if (this.formData.searchType == 'roleid') {//游戏ID查询
      api = 'getDataListByRoleId';
    }
    if (this.formData.searchType == 'account') {//玩家账号查询
      api = 'getDataListByAccount';
    }
    return this.apiServ[api](Object.assign({
      page: this.formData.page,
      limit: this.formData.limit,
      keyword: this.formData.keyword,
      beginTime: this.formData.beginTime,
      endTime: this.formData.endTime,
    }, data), options).pipe(
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
      this.alert.toast('请输入开始时间和结束时间');
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
}
