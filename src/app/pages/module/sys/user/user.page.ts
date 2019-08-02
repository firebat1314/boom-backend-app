import { Component, OnInit, ViewChild } from '@angular/core';
import { PopupService } from 'src/app/providers/popup/popup.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/providers/api.service';
import { IonRefresher, IonInfiniteScroll, IonContent, ModalController, AlertController } from '@ionic/angular';
import { HttpOptions } from 'src/app/providers/http.service';
import { map, finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AddAdminComponent } from './add-admin/add-admin.component';

@Component({
  selector: 'sss-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  @ViewChild(IonRefresher, { static: false }) refresher: IonRefresher;
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent, { static: false }) content: IonContent;

  dataList: Array<any> = [];
  selectAll: boolean = false;
  selectAllIds: any[] = [];
  multiple: boolean = false;
  pageIndex: number = 1;
  pageSize: number = 20;
  username: string = '';
  data: any;
  listServ: Subscription;

  constructor(
    private route: ActivatedRoute,
    private apiServ: ApiService,
    private popupServ: PopupService,
    private modalController: ModalController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.doRefresh(null, { showLoading: true });
  }
  //新增管理员
  async addAdmin(id?: number) {

    const modal = await this.modalController.create({
      component: AddAdminComponent,
      componentProps: {
        userId: id || 0
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
    return this.apiServ.sysUserList({
      'page': this.pageIndex,
      'limit': this.pageSize,
      'username': this.username,
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
        this.selectAllIds = [];//清空多选选中
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
  toggleMultiple() {
    this.selectAllIds = [];
    this.dataList.forEach(item => {
      item.checked = false;
    })
    this.multiple = !this.multiple;
  }
  // 全选
  checkAll() {
    setTimeout(() => {
      this.selectAllIds = []
      this.dataList.forEach(item => {
        item.checked = this.selectAll;
        item.checked && this.selectAllIds.push(item.userId);
      })
      // console.log(this.selectAllIds)
    }, 100);
  }
  // 单选 使用every遍历数组每一项，每一项返回true,则最终结果为true。当任何一项返回false时，停止遍历，返回false。不改变原数组
  checkOneBox(item) {
    // 判断是否全选
    setTimeout(() => {
      if (this.dataList.every(item => item.checked === true)) {
        this.selectAll = true
      } else {
        this.selectAll = false
      }
      // 如果被点击则存其id
      if (item.checked) {
        if (this.selectAllIds.indexOf(item.userId) <= -1) {
          this.selectAllIds.push(item.userId)
        }
      } else {
        // 删除数组里取消选择的id
        for (let i = 0; i < this.selectAllIds.length; i++) {
          if (this.selectAllIds[i] === item.userId) {
            this.selectAllIds.splice(i, 1)
          }
        }
      }
      // console.log(this.selectAllIds)
    }, 100);
  }
  addOrUpdateHandle(id) {
    this.addAdmin(id)
  }
  async deleteHandle(id?) {
    var userIds = id ? [id] : this.selectAllIds;
    let alert = await this.alertController.create({
      header: `确定对[id=${userIds.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`,
      buttons: [{
        text: '取消'
      }, {
        text: '删除',
        handler: () => {
          this.apiServ.sysUserDelete(userIds).subscribe(data => {
            if (data && data.code === 0) {
              this.popupServ.toast('删除成功');
              this.doRefresh();
              this.multiple = false;
            }
          })
        }
      }]
    })
    await alert.present();
  }
  deleteInBatches() {
    this.deleteHandle();
  }
}
