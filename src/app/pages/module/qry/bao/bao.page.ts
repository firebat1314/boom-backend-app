import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonRefresher, IonInfiniteScroll, IonContent, IonSearchbar } from '@ionic/angular';
import { ApiService } from 'src/app/providers/api.service';
import { HttpOptions } from 'src/app/providers/http.service';
import { map, finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';

export interface qryBaoForm {
  'keyword'?: string;
}

@Component({
  selector: 'sss-bao',
  templateUrl: './bao.page.html',
  styleUrls: ['./bao.page.scss'],
})
export class BaoPage implements OnInit {

  @ViewChild(IonRefresher, { static: false }) refresher: IonRefresher;
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  @ViewChild(IonSearchbar, { static: false }) searchBar: IonSearchbar

  formData: qryBaoForm = {
    keyword: '35563',
  };

  data: any;
  dataList: any = [];
  listServ: Subscription;

  constructor(
    public navController: NavController,
    public apiServ: ApiService,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.searchBar.setFocus();
    }, 200);
  }
  onSearchKeyUp(e: KeyboardEvent) {
    console.log(e)
    e.preventDefault();
    if ("Enter" == e.key) {
      this.getDataList().subscribe();
    }
  }

  getDataList(data = {}, options?: HttpOptions) {
    return this.apiServ.baoInfo(Object.assign({ keyword: this.formData.keyword }, data), options).pipe(
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
    this.listServ = this.getDataList({}, { showLoading: false }).subscribe(res => {
      if (res && res.code === 0) {
        this.infiniteScroll.disabled = false;
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
  getBorrow(id) {
    this.navController.navigateForward(['/module/qry/bao/borrow'], {
      queryParams: {
        id: id,
      }
    });
  }
  getDeposit(id) {
    this.navController.navigateForward(['/module/qry/bao/deposit'], {
      queryParams: {
        'roleId': id,
      }
    });
  }
}
