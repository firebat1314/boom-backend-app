import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonInfiniteScroll, NavController, IonContent, IonRefresher } from '@ionic/angular';
import { SearchPage } from './search/search.page';
import { PopupService } from 'src/app/providers/popup/popup.service';
import { ApiService } from 'src/app/providers/api.service';
import { catchError, finalize, map } from 'rxjs/operators';
import { HttpOptions } from 'src/app/providers/http.service';
import { Subscription, of } from 'rxjs';
import { UtilsService } from 'src/app/providers/utils/utils.service';
import { ActivatedRoute } from '@angular/router';
import { GetGameNameByTypePipe } from 'src/app/pipes/get-game-name-by-type/get-game-name-by-type.pipe';

import * as moment from 'moment';

export interface qryGameForm {
  'page'?: number
  'limit'?: number
  'keyword'?: string;
  'gameType'?: string;
  'beginTime'?: any;
  'endTime'?: any;
}
@Component({
  selector: 'sss-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
  providers: [GetGameNameByTypePipe]
})
export class GamePage implements OnInit {


  @ViewChild(IonRefresher, { static: false }) refresher: IonRefresher;
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent, { static: false }) content: IonContent;


  formData: qryGameForm = {
    page: 1,
    limit: 10,
    gameType: '0',
    keyword: '35705',
    beginTime: '',
    endTime: '',
  };
  beginTime = '';
  endTime = '';

  data: any;
  dataList: any = [];
  listServ: Subscription;
  options: any[];
  showPopup: boolean = false;
  constructor(
    private popupServ: PopupService,
    private utils: UtilsService,
    public modalController: ModalController,
    public apiServ: ApiService,
    public navController: NavController,
    private route: ActivatedRoute,
    private getGameName: GetGameNameByTypePipe

  ) {
  }

  ngOnInit() {

    this.beginTime = moment('2019-07-01').format();
    this.endTime = moment().add(1, 'days').format();//后一天
    this.formData.beginTime = moment(this.beginTime).format('YYYY-MM-DD HH:mm:ss');
    this.formData.endTime = moment(this.endTime).format('YYYY-MM-DD HH:mm:ss');

    this.doRefresh();
    this.apiServ.gameType().subscribe(data => {
      if (data && data.code === 0) {
        var options = new Array()
        for (let i = 0; i < data.gameType.length; i++) {
          var item = { value: data.gameType[i].id, label: '' + data.gameType[i].name }
          options.push(item)
        }
        this.options = options;
      } else {
        this.options = [];
      }
    })
  }
  dateChange(type: string, time: string) {
    this.formData[type] = moment(time).format('YYYY-MM-DD HH:mm:ss');
  }

  searchRequest() {
    if (this.formData.keyword.trim() === '') {
      this.popupServ.toast('请输入关键字');
      return
    }

    if (!this.formData.beginTime || !this.formData.endTime) {
      this.popupServ.toast('请输入开始时间和结束时间');
      return
    }

    this.showPopup = false;
    this.listServ && this.listServ.unsubscribe();//取消搜索之前的接口请求
    this.formData.page = 1;
    this.listServ = this.getDataList().subscribe((res) => {
      if (res && res.code === 0) {
        this.infiniteScroll.disabled = false;
        this.content.scrollToTop(0);//搜索回调页面返回顶部
        this.dataList = res.page.list;
      } else {
      }
    });
  }
  getDataList(data = {}, options?: HttpOptions) {
    return this.apiServ.gameList(Object.assign(this.formData, data), options).pipe(
      map((res) => {
        if (res && res.code === 0) {
          this.data = res;
        }
        return res;
      }),
      finalize(() => {
        this.infiniteScroll.complete();//ajax完成时、发生错误或者取消订阅时取消加载
      })
    )
  }

  doRefresh(event?: any) {
    this.listServ = this.getDataList({
      page: 1,
    }, { showLoading: false }).subscribe(res => {
      if (res && res.code === 0) {
        this.refresher.complete();//ajax完成时、发生错误或者取消订阅时取消刷新
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
  detailHandler(gameItem) {
    let name = this.getGameName.transform(gameItem.gameType);
    if (gameItem.gameType === 2) {
      this.navController.navigateForward(['../lottery'], {
        queryParams: {
          id: gameItem.id,
          type: gameItem.gameType,
          name: name
        },
        relativeTo: this.route
      });
    } else {
      this.navController.navigateForward(['./record-list'], {
        queryParams: {
          roleId: gameItem.roleId,
          gameType: gameItem.gameType,
          recordId: gameItem.recordId,
          channelId: gameItem.channelId,
          useGold: gameItem.useGold,
          name: name
        },
        relativeTo: this.route
      });
    }
  }
}
