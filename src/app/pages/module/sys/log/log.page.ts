import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { IonRefresher, IonInfiniteScroll, IonContent, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/providers/api.service';
import { RoleAddOrUpdateComponent } from '../role/role-add-or-update/role-add-or-update.component';
import { HttpOptions } from 'src/app/providers/http.service';
import { map, finalize } from 'rxjs/operators';

@Component({
  selector: 'sss-log',
  templateUrl: './log.page.html',
  styleUrls: ['./log.page.scss'],
})
export class LogPage implements OnInit {
  @ViewChild(IonRefresher, { static: false }) refresher: IonRefresher;
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  @ViewChildren('div') div:HTMLDivElement;

  pageIndex: number = 1;
  pageSize: number = 20;
  key: string = '';
  listServ: Subscription;
  data: any;
  dataList: Array<any> = [];

  constructor(
    private apiServ: ApiService,
    private modalController: ModalController,
  ) {
  }
  ngAfterViewInit(){
    console.log(this.div)

}
  ngOnInit() {
    this.doRefresh(null, { showLoading: true });
  }
  //新增管理员
  async addAdmin(id?: number) {

    const modal = await this.modalController.create({
      component: RoleAddOrUpdateComponent,
      componentProps: {
        roleId: id || 0
      }
    });
    modal.onWillDismiss().then(({ data }) => {
      if (data && data.dismissed) {
        this.listServ && this.listServ.unsubscribe();//取消搜索之前的接口请求
        this.listServ = this.getDataList().subscribe((res) => {
          if (res && res.code === 0) {
            this.infiniteScroll.disabled = false;
            this.dataList = res.page.list;
          } else {
          }
        });
      }
    });
    return await modal.present();
  }

  getDataList(data?, options?: HttpOptions) {
    return this.apiServ.sysLogList({
      'page': this.pageIndex,
      'limit': this.pageSize,
      'key': this.key,
      ...data
    }, options).pipe(
      map((res: any) => {
        if (res && res.code === 0) {
          this.data = res;
        }
        return res;
      }),
      finalize(() => {
      })
    )
  }
  searchRequest() {
    this.doRefresh();
  }
  doRefresh(event?: any, options?: HttpOptions) {
    this.listServ = this.getDataList({
      page: 1,
    }, { showLoading: false, ...options }).subscribe(res => {
      if (res && res.code === 0) {
        this.content.scrollToTop(0);//
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
        this.infiniteScroll.complete();//ajax完成时、发生错误或者取消订阅时取消加载
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
