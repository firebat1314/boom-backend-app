import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { PopupService } from 'src/app/providers/popup/popup.service';
import { ApiService } from 'src/app/providers/api.service';

@Component({
  selector: 'sss-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  @Input() formData = {
    page: 1,
    limit: 10,
    channel: '',
    beginTime: '2019-04-01',
    endTime: '2019-07-01',
  };
  channelList: any;

  constructor(
    public modalController: ModalController,
    private popupServ: PopupService,
    private apiServ: ApiService,
    private alertCtrl: AlertController,
  ) { }


  ngOnInit() {
    this.apiServ.operateChannel().subscribe(res => {
      if (res && res.code === 0) {
        this.channelList = res.channelList;
      } else {
        this.alertCtrl.create({
          header: res.msg,
          buttons: [{
            text: '确定'
          }]
        })
      }
    });
  }

  dismiss(data?: any) {
    this.modalController.dismiss(data);
  }

  submit() {
    if (!this.formData.beginTime || !this.formData.endTime) {
      this.popupServ.toast('请输入开始时间和结束时间');
      return
    }

    this.formData.beginTime = this.formData.beginTime.split('T')[0];
    this.formData.endTime = this.formData.endTime.split('T')[0];
    this.dismiss(this.formData);
  }

}
