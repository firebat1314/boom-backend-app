import { Component, OnInit, Input } from '@angular/core';
import { ModalController, PickerController, AlertController } from '@ionic/angular';
import { PopupService } from 'src/app/providers/popup/popup.service';
import { ApiService } from 'src/app/providers/api.service';

@Component({
  selector: 'sss-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  @Input() formData = {
    'page': 1,
    'limit': 10,
    'channelType':'',
    'beginTime': '2019-05-08',
    'endTime': '2019-08-31',
  };
  optionsChannel: any = [];
  constructor(
    public modalController: ModalController,
    private popupServ: PopupService,
    private apiServ: ApiService,
    private alertCtrl: AlertController,
  ) { }


  ngOnInit() {
    this.apiServ.statsUserChannel().subscribe(res => {
      if (res && res.code === 0) {
        this.optionsChannel = res.channelList;
      } else {
        this.alertCtrl.create({
          header: '提示',
          message: res.msg,
          buttons: [{ text: '确定' }]
        }).then(res => {
          res.present();
        });
      }
    })
  }

  dismiss(data?: any) {
    this.modalController.dismiss(data);
  }


  submit() {
    this.formData.beginTime = this.formData.beginTime.split('T')[0];
    this.formData.endTime = this.formData.endTime.split('T')[0];
    this.dismiss({ formData: this.formData });
  }
}
