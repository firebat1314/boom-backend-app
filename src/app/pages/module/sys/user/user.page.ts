import { Component, OnInit, ViewChild } from '@angular/core';
import { PopupService } from 'src/app/providers/popup/popup.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/providers/api.service';
import { IonRefresher, IonInfiniteScroll, IonContent } from '@ionic/angular';
import { HttpOptions } from 'src/app/providers/http.service';
import { map, finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sss-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  @ViewChild(IonRefresher) refresher: IonRefresher;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent) content: IonContent;

  dataList: Array<any> = [];
  dataListSelections: any[] = [];
  multiple: boolean = false;
  pageIndex: number = 1;
  pageSize: number = 20;
  userName: string = '';
  data: any;
  listServ: Subscription;

  constructor(
    private route: ActivatedRoute,
    private apiServ: ApiService,
    private popupServ: PopupService,
  ) { }

  ngOnInit() {
    this.doRefresh(null, { showLoading: true });
  }

  getDataList(data?, options?: HttpOptions) {
    return this.apiServ.sysUserList({
      'page': this.pageIndex,
      'limit': this.pageSize,
      'username': this.userName,
      ...data
    }, options).pipe(
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

  doRefresh(event?: any, options?: HttpOptions) {
    this.listServ = this.getDataList({
      page: 1,
    }, { showLoading: false, ...options }).subscribe(res => {
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
