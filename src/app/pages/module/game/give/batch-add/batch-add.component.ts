import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/providers/api.service';
import { ModalController, AlertController } from '@ionic/angular';
import { PopupService } from 'src/app/providers/popup/popup.service';

@Component({
  selector: 'sss-batch-add',
  templateUrl: './batch-add.component.html',
  styleUrls: ['./batch-add.component.scss'],
})
export class BatchAddComponent implements OnInit {
  @Input() index: number;
  @Input() channelId: number;
  @Input() dataListType: number;
  keyword: string = '';

  constructor(
    private apiServ: ApiService,
    private modalController: ModalController,
    private popupServ: PopupService,
  ) { }

  ngOnInit() { }

  dismiss(data?: any) {
    this.modalController.dismiss(data);
  }

  confirm() {
    if (!this.keyword) {
      this.popupServ.toast('内容不能为空');
      return false;
    }
    this.apiServ.gameGiveRestriceBatchSave({
      'chId': this.channelId,
      'index': this.index,
      'forbidType': this.dataListType,
      'params': this.keyword
    }).subscribe(data => {
      if (data && data.code === 0) {
        this.popupServ.toast(data.mag || '添加成功');
        this.dismiss({
          dismissed: true
        });
      }
    })
  }
}
