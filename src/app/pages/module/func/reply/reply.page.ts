import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRefresher, IonInfiniteScroll, IonContent, ModalController, AlertController, ActionSheetController } from '@ionic/angular';
import { ApiService } from 'src/app/providers/api.service';
import { PopupService } from 'src/app/providers/popup/popup.service';
import { UtilsService } from 'src/app/providers/utils/utils.service';
import { HttpOptions } from 'src/app/providers/http.service';
import { map, finalize } from 'rxjs/operators';
import { TargetComponent } from '../mail/target/target.component';
import { GlobalComponent } from '../mail/global/global.component';

@Component({
  selector: 'sss-reply',
  templateUrl: './reply.page.html',
  styleUrls: ['./reply.page.scss'],
})
export class ReplyPage implements OnInit {

  @ViewChild(IonRefresher, { static: false }) refresher: IonRefresher;
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  formData = {
    'page': 1,
    'limit': 10,
  }

  data: any;
  dataList: any;
  listServ: any;

  constructor(
    public modalController: ModalController,
    private apiServ: ApiService,
    private popupServ: PopupService,
    private alertCtrl: AlertController,
    private utilsServ: UtilsService,
    private actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    this.doRefresh();
  }
  doRefresh(event?: any) {
    if (!this.utilsServ.isAuth('func:reply:list')) {
      return this.popupServ.toast('没有权限');
    };
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

  getDataList(data = {}, options?: HttpOptions) {

    return this.apiServ.funcReplyList(Object.assign(this.formData, data), options).pipe(
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
  frozenHandler(id) {

  }
  batchHandler() {
    if (!this.utilsServ.isAuth('func:reply:batch')) {
      return this.popupServ.toast('没有权限');
    };
    
  }
}
