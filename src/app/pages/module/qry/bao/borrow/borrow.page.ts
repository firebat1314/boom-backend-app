import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonRefresher, IonContent } from '@ionic/angular';
import { ApiService } from 'src/app/providers/api.service';
import { ActivatedRoute } from '@angular/router';
import { HttpOptions } from 'src/app/providers/http.service';
import { map, finalize } from 'rxjs/operators';

@Component({
  selector: 'sss-borrow',
  templateUrl: './borrow.page.html',
  styleUrls: ['./borrow.page.scss'],
})
export class BorrowPage implements OnInit {

  @ViewChild(IonRefresher, { static: false }) refresher: IonRefresher;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  roleId: string;
  data: any;
  dataList: Array<any> = [];
  listServ: any;

  constructor(
    public modalController: ModalController,
    private route: ActivatedRoute,
    private apiServ: ApiService,
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.roleId = params.get('id');
      this.getDataList().subscribe();
    });
  }

  getDataList(data = {}, options?: HttpOptions) {
    return this.apiServ.baoBorrow(Object.assign({ roleId: this.roleId }, data), options).pipe(
      map((res) => {
        if (res && res.code === 0) {
          this.data = res;
          let arr = new Array();
          arr.push(res.data);
          this.dataList = arr;
        }
        return res;
      }),
      finalize(() => {
        this.refresher.complete();//ajax完成时、发生错误或者取消订阅时取消刷新
      })
    )
  }

  doRefresh(event: any) {
    this.listServ = this.getDataList({}, { showLoading: false }).subscribe(res => {
      if (res && res.code === 0) {
        this.dataList = res.page.list;
      } else {
      }
    })
  }
}
