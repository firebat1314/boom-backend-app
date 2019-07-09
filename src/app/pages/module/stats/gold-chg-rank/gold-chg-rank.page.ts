import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/providers/api.service';
import { PopupService } from 'src/app/providers/popup/popup.service';
import { UtilsService } from 'src/app/providers/utils/utils.service';
import { SearchPage } from './search/search.page';
import { AddOrUpdatePage } from '../../qry/agent/add-or-update/add-or-update.page';
import { HttpOptions } from 'src/app/providers/http.service';
import { map, finalize } from 'rxjs/operators';
import { IonRefresher, IonContent, ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'sss-gold-chg-rank',
  templateUrl: './gold-chg-rank.page.html',
  styleUrls: ['./gold-chg-rank.page.scss'],
})
export class GoldChgRankPage implements OnInit {


  @ViewChild(IonRefresher) refresher: IonRefresher;
  @ViewChild(IonContent) content: IonContent;
  formData = {
    page: 1,
    limit: 10,
    // keyword: '',
    beginTime: '2019-04-01',
    endTime: '2019-07-01',
  }
  data: any;
  dataList: any;
  listServ: any;

  dataListType = 'dataListWin';

  addOrUpdateResponse: any;
  exchgRankList: any;
  loseRankList: any;
  winRankList: any;
  pageswiper: any;

  constructor(
    public modalController: ModalController,
    private route: ActivatedRoute,
    private apiServ: ApiService,
    private popupServ: PopupService,
    private alertCtrl: AlertController,
    private utilsServ: UtilsService, public element: ElementRef,
  ) { }

  ngOnInit() {

  }
  dataListTypeChanged() {
    this.content.scrollToTop(0);//搜索回调页面返回顶部
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
            this.content.scrollToTop(0);//搜索回调页面返回顶部
          } else {
          }
        });
      }
    });
    return await modal.present();
  }

  getDataList(data = {}, options?: HttpOptions) {

    return this.apiServ.statsGoldChgRank(Object.assign(this.formData, data), options).pipe(
      map((res: any) => {
        if (res && res.code === 0) {
          this.data = res;
          this.exchgRankList = res.exchgRankList;
          this.loseRankList = res.loseRankList;
          this.winRankList = res.winRankList;

        }
        return res;
      }),
      finalize(() => {
        this.refresher.complete();//ajax完成时、发生错误或者取消订阅时取消刷新
      })
    )
  }

  doRefresh(event?: any) {

    this.listServ = this.getDataList({}, { showLoading: false }).subscribe(res => {
      if (res && res.code === 0) {
        this.exchgRankList = res.exchgRankList;
        this.loseRankList = res.loseRankList;
        this.winRankList = res.winRankList;
      } else {
      }
    })
  }

}
