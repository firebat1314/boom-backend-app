import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRefresher, IonContent, ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PopupService } from 'src/app/providers/popup/popup.service';
import { ApiService } from 'src/app/providers/api.service';
import { SearchPage } from './search/search.page';
import { HttpOptions } from 'src/app/providers/http.service';
import { map, finalize } from 'rxjs/operators';

@Component({
  selector: 'sss-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  @ViewChild(IonRefresher) refresher: IonRefresher;
  @ViewChild(IonContent) content: IonContent;

  formData = {
    beginTime: '2019-04-01',
    endTime: '2019-07-01',
    gameType: '',
    channelId: '',
  };
  data: any;
  dataList: any = [];
  listServ: Subscription;
  constructor(
    private popupServ: PopupService,
    public modalController: ModalController,
    public apiServ: ApiService,
    public navController: NavController,
  ) { }

  ngOnInit() {
    this.doRefresh();
  }

  //搜索弹窗
  async search() {
    let formData = this.formData;

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
            this.content.scrollToTop(0);//搜索回调页面返回顶部
          } else {
          }
        });
      }
    });

    return await modal.present();
  }
  getDataList(data = {}, options?: HttpOptions) {
    return this.apiServ.statsGame(Object.assign(this.formData, data), options).pipe(
      map((res) => {
        if (res && res.code === 0) {
          this.data = res;
          this.dataList = res.list;
        }
        return res;
      }),
      finalize(() => {
        this.refresher.complete();//ajax完成时、发生错误或者取消订阅时取消刷新
      })
    )
  }

  doRefresh(event?: any) {
    this.listServ = this.getDataList({
      page: 1,
    }, { showLoading: false }).subscribe(res => {
      if (res && res.code === 0) {
      } else {
      }
    })
  }
}
