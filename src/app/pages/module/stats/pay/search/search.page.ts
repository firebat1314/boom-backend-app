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
    beginTime: '2019-04-01',
    endTime: '2019-07-01',
    channel: '',
    payType: '',
    payCh: '',
  };
  optionsPayInfo: any = [];
  optionspayType: any = [];
  optionspayPayCh: any = [];

  constructor(
    public modalController: ModalController,
    private popupServ: PopupService,
    private apiServ: ApiService,
    private alertCtrl: AlertController,
  ) { }


  ngOnInit() {
    this.apiServ.payListInfo().subscribe(res => {
      if (res && res.code === 0) {
        this.optionsPayInfo = res.list;
        if (this.formData.channel) {
          for (var i = this.optionsPayInfo.length - 1; i >= 0; i--) {
            if (this.optionsPayInfo[i].value == this.formData.channel) {
              this.optionspayType = this.optionsPayInfo[i].children;
            }
          }
        }
        if (this.formData.payType) {
          for (var i = this.optionspayType.length - 1; i >= 0; i--) {
            if (this.optionspayType[i].value == this.formData.payType) {
              this.optionspayPayCh = this.optionspayType[i].children;
            }
          }
        }
      } else {
        this.alertCtrl.create({
          header: res.msg,
          buttons: [{
            text: '确定'
          }]
        }).then(res => {
          res.present();
        })
      }
    })
  }
  channelChange(event) {
    this.formData.payType = ''
    this.formData.payCh = ''
    if (this.formData.channel) {
      for (var i = this.optionsPayInfo.length - 1; i >= 0; i--) {
        if (this.optionsPayInfo[i].value == this.formData.channel) {
          this.optionspayType = this.optionsPayInfo[i].children;
        }
      }
    } else {
      this.optionspayType = [];
    }
  }

  payTypeChange(event) {
    this.formData.payCh = ''
    if (this.formData.payType) {
      for (var i = this.optionspayType.length - 1; i >= 0; i--) {
        if (this.optionspayType[i].value == this.formData.payType) {
          this.optionspayPayCh = this.optionspayType[i].children;
        }
      }
    } else {
      this.optionspayPayCh = [];
    }
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
