import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonInfiniteScroll, NavController, IonContent, IonRefresher } from '@ionic/angular';
import { SearchPage } from './search/search.page';
import { AlertService } from 'src/app/providers/alert/alert.service';
import { ApiService } from 'src/app/providers/api.service';
import { catchError, finalize, map } from 'rxjs/operators';
import { HttpOptions } from 'src/app/providers/http.service';
import { Subscription, of } from 'rxjs';

export interface qryGameForm {
  'page'?: number
  'limit'?: number
  'keyword'?: string;
  'gameType'?: string;
  'beginTime'?: string;
  'endTime'?: string;
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
    limit: 5,
    gameType: '0',
    keyword: '35563',
    beginTime: '2019-04-01',
    endTime: '2019-07-01',
  };
  data: any;
  dataList: any = [];
  listServ: Subscription;
  constructor(
    private alert: AlertService,
    public modalController: ModalController,
    public apiServ: ApiService,
    public navController: NavController,
  ) { }

  ngOnInit() {
    /* this.listServ = this.getDataList().subscribe(res => {
      this.dataList = res.page.list;
    }); */
  }

  //搜索弹窗
  async gamesSearch() {
    let formData = this.formData;
    formData.page = 1;

    const modal = await this.modalController.create({
      component: SearchPage,
      componentProps: {
        formData: formData
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

  doRefresh(event: any) {
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
