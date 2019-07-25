import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRefresher, IonInfiniteScroll, IonContent, ModalController, AlertController, ActionSheetController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/providers/api.service';
import { PopupService } from 'src/app/providers/popup/popup.service';
import { UtilsService } from 'src/app/providers/utils/utils.service';
import { HttpOptions } from 'src/app/providers/http.service';
import { map, finalize } from 'rxjs/operators';
import { GlobalComponent } from './global/global.component';
import { TargetComponent } from './target/target.component';

@Component({
  selector: 'sss-mail',
  templateUrl: './mail.page.html',
  styleUrls: ['./mail.page.scss'],
})
export class MailPage implements OnInit {

  @ViewChild(IonRefresher) refresher: IonRefresher;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent) content: IonContent;
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
  getDataList(data = {}, options?: HttpOptions) {

    return this.apiServ.funcMailList(Object.assign(this.formData, data), options).pipe(
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
  async sendEmail() {
    const actionSheet = await this.actionSheetController.create({
      header: '发送邮件',
      buttons: [{
        text: '指定发送',
        handler: async () => {
          this.modalController.create({
            component: TargetComponent
          }).then(modal => {
            modal.onWillDismiss().then(({ data }) => {
              if (data) {
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
            modal.present();
          });
        }
      }, {
        text: '全局发送',
        handler: () => {
          this.modalController.create({
            component: GlobalComponent
          }).then(modal => {
            modal.onWillDismiss().then(({ data }) => {
              if (data) {
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
            modal.present();
          });
        }
      }, {
        text: '取消',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }

}
