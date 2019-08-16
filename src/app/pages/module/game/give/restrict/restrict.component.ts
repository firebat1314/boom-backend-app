import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/providers/api.service';
import { ModalController, AlertController } from '@ionic/angular';
import { PopupService } from 'src/app/providers/popup/popup.service';
import { BatchAddComponent } from '../batch-add/batch-add.component';

@Component({
  selector: 'sss-restrict',
  templateUrl: './restrict.component.html',
  styleUrls: ['./restrict.component.scss'],
})
export class RestrictComponent implements OnInit {
  @Input() index: number;
  @Input() channelId: number;

  dataListType = 1;
  onDeviceList: any[] = [];
  ipList: any[] = [];
  selectAllValues: any[] = [];
  selectAll: boolean = false;

  constructor(
    private apiServ: ApiService,
    private modalController: ModalController,
    private alertController: AlertController,
    private popupServ: PopupService,
  ) { }

  ngOnInit() {
    this.getDataList();
  }

  getDataList(options?) {
    return new Promise((resolve, reject) => {
      this.selectAll = false;
      this.checkAll();
      this.apiServ.gameGiveRestriceData({
        'index': this.index,
        'chId': this.channelId
      }, { ...options }).subscribe(data => {
        if (data && data.code === 0) {
          resolve(data)
          this.ipList = data.ipList;
          this.onDeviceList = data.onDeviceList;
        } else {
          reject(data);
        }
      });
    })
  }
  doRefresh(event) {
    this.getDataList().then(res => {
      event.target.complete();//ajax完成时、发生错误或者取消订阅时取消刷新
    })
  }
  dataListTypeChanged(event) {
    this.selectAll = false;
    this.checkAll();
  }

  dismiss(data?: any) {
    this.modalController.dismiss(data);
  }

  // 全选
  checkAll() {
    setTimeout(() => {
      this.selectAllValues = []
      this[this.dataListType == 1 ? 'ipList' : 'onDeviceList'].forEach(item => {
        item.checked = this.selectAll;
        item.checked && this.selectAllValues.push(item.forbidVal);
      })
      // console.log(this.selectAllValues)
    }, 100);
  }
  // 单选 使用every遍历数组每一项，每一项返回true,则最终结果为true。当任何一项返回false时，停止遍历，返回false。不改变原数组
  checkOneBox(item) {
    // 判断是否全选
    setTimeout(() => {
      if (this[this.dataListType == 1 ? 'ipList' : 'onDeviceList'].every(item => item.checked === true)) {
        this.selectAll = true
      } else {
        this.selectAll = false
      }
      // 如果被点击则存其id
      if (item.checked) {
        if (this.selectAllValues.indexOf(item.forbidVal) <= -1) {
          this.selectAllValues.push(item.forbidVal)
        }
      } else {
        // 删除数组里取消选择的id
        for (let i = 0; i < this.selectAllValues.length; i++) {
          if (this.selectAllValues[i] === item.forbidVal) {
            this.selectAllValues.splice(i, 1)
          }
        }
      }
      // console.log(this.selectAllValues)
    }, 100);
  }
  async deleteInBatches() {
    let alert = await this.alertController.create({
      header: `确定删除`,
      buttons: [{
        text: '取消'
      }, {
        text: '删除',
        handler: () => {
          this.apiServ.gameGiveRestriceBatchDel({
            'chId': this.channelId,
            'index': this.index,
            'params': this.selectAllValues.join(',')
          }).subscribe(data => {
            if (data && data.code === 0) {
              this.popupServ.toast('操作成功');

              this.getDataList();
            }
          })
        }
      }]
    })
    await alert.present();

  }

  async batchSave() {
    const modal = await this.modalController.create({
      component: BatchAddComponent,
      componentProps: {
        index: this.index,
        channelId: this.channelId,
        dataListType: this.dataListType
      }
    });
    modal.onWillDismiss().then(({ data }) => {
      if (data && data.dismissed) {
        this.getDataList();
      }
    });
    return await modal.present();
  }
}
