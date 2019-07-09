import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRefresher, IonContent, ModalController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/providers/api.service';
import { PopupService } from 'src/app/providers/popup/popup.service';
import { UtilsService } from 'src/app/providers/utils/utils.service';
import { SearchPage } from './search/search.page';
import { HttpOptions } from 'src/app/providers/http.service';
import { map, finalize } from 'rxjs/operators';

@Component({
  selector: 'sss-wadv',
  templateUrl: './wadv.page.html',
  styleUrls: ['./wadv.page.scss'],
})
export class WadvPage implements OnInit {

  @ViewChild(IonRefresher) refresher: IonRefresher;
  @ViewChild(IonContent) content: IonContent;
  formData = {
    salary: {
      orderBy: '',
      sortMethod: '',
    },
    child: {
      orderBy: '',
      sortMethod: '',
    },
  }
  data: any;
  dataList: any;
  listServ: any;

  dataListType: 'salary' | 'child' = "salary"
  dataListSalary: Array<any> = [];
  dataListChild: Array<any> = []


  constructor(
    public modalController: ModalController,
    private route: ActivatedRoute,
    private apiServ: ApiService,
    private popupServ: PopupService,
    private alertCtrl: AlertController,
    public utilsServ: UtilsService,

  ) { }

  ngOnInit() {
    this.dataListTypeChanged()
  }

  //搜索弹窗
  async search() {
    let formData = this.formData;

    const modal = await this.modalController.create({
      component: SearchPage,
      componentProps: {
        formData: formData,
      }
    });
    modal.onWillDismiss().then(({ data }) => {
      if (data) {
        this.dataListTypeChanged(null, (res) => {
          if (res && res.code === 0) {
            this.content.scrollToTop(0);//搜索回调页面返回顶部
            this.dataList = res.list;
          }
        })
      }
    });
    return await modal.present();
  }


  doRefresh(event?: any) {
    this.dataListTypeChanged(null, () => {
      this.refresher.complete();//ajax完成时、发生错误或者取消订阅时取消刷新
    })
  }
  dataListTypeChanged(event?, callback?: Function) {
    if (this.dataListType == 'salary') {
      this.getDataListSalary(callback);
    } else if (this.dataListType == 'child') {
      this.getDataListChild(callback);
    }
  }
  getDataListSalary(callback?: Function) {
    this.apiServ.statsWadvSalary({
      'orderBy': this.formData.salary.orderBy,
      'sortMethod': this.formData.salary.sortMethod
    }).subscribe(res => {
      callback && callback(res);
      if (res && res.code === 0) {
        this.dataListSalary = res.list;
      }
    })
  }
  getDataListChild(callback?: Function) {
    this.apiServ.statsWadvChild({
      'orderBy': this.formData.child.orderBy,
      'sortMethod': this.formData.child.sortMethod
    }).subscribe(res => {
      callback && callback(res);
      if (res && res.code === 0) {
        this.dataListChild = res.list
      }
    })
  }
}
