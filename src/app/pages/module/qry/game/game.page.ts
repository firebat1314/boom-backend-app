import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonInfiniteScroll, NavController, IonContent, IonRefresher } from '@ionic/angular';
import { SearchPage } from './search/search.page';
import { PopupService } from 'src/app/providers/popup/popup.service';
import { ApiService } from 'src/app/providers/api.service';
import { catchError, finalize, map } from 'rxjs/operators';
import { HttpOptions } from 'src/app/providers/http.service';
import { Subscription, of } from 'rxjs';
import { UtilsService } from 'src/app/providers/utils/utils.service';

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
})
export class GamePage implements OnInit {


  @ViewChild(IonRefresher) refresher: IonRefresher;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent) content: IonContent;


  formData: qryGameForm = {
    page: 1,
    limit: 10,
    gameType: '0',
    keyword: '35563',
    beginTime: '2019-04-01',
    endTime: '2019-07-01',
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

  ) {
  }

  ngOnInit() {
    let curDate = new Date(new Date().getTime());
    let nextDate = new Date(curDate.getTime() + 24 * 60 * 60 * 1000); //后一天
    this.beginTime = this.utils.dateFormat(curDate, 'YYYY-MM-DDTHH:mm+08:00');
    this.endTime = this.utils.dateFormat(nextDate, 'YYYY-MM-DDTHH:mm+08:00');
    this.formData.beginTime = this.utils.dateFormat(curDate, 'YYYY-MM-DD');
    this.formData.endTime = this.utils.dateFormat(nextDate, 'YYYY-MM-DD');

    /* this.listServ = this.getDataList().subscribe(res => {
      this.dataList = res.page.list;
    }); */
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
  dateChange() {
    this.formData.beginTime = this.beginTime.split('T')[0];
    this.formData.endTime = this.endTime.split('T')[0];
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
  detailHandler(id: any, type: any) {
    let url = '';
    if (type === 5 || type === 9) {
      url = '/qry/game/dragon';
    } else if (type === 8) {
      url = '/qry/game/grabniu';
    } else if (type === 6) {
      url = '/qry/game/animal';
    } else if (type === 7) {
      url = '/qry/game/car';
    } else if (type === 10 || type === 15) {
      url = '/qry/game/fish';
    } else if (type === 2) {
      url = '/qry/game/lottery';
    } else if (type === 12) {
      url = '/qry/game/landlords';
    } else {
      // 直接弹出来
      return false;
    }
    this.navController.navigateForward([url], {
      queryParams: {
        id: id,
        type: type
      }
    });
  }
}
