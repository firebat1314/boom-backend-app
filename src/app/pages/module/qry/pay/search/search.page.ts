import { Component, OnInit, Input } from '@angular/core';
import { ModalController, PickerController } from '@ionic/angular';
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
    'keyword': '',
    'orderId': '',
    'outerOrderId': '',
    'status': '',
    'beginTime': '2019-05-08',
    'endTime': '2019-08-31',
    'payInfo': '',
    'orderBy': '',
    'sortMethod': ''
  };
  @Input() payInfoArr = [];
  payInfoLabel = '';
  optionsPayInfo: any;
  constructor(
    public modalController: ModalController,
    private popupServ: PopupService,
    private apiServ: ApiService,
  ) { }


  ngOnInit() {
    this.apiServ.payInfoList().subscribe(res => {
      if (res && res.code === 0) {
        this.optionsPayInfo = res.list;
        this.payInfoLabel = this.payInfoArr.map(item => item.label).join(',');
      }
    })
  }

  dismiss(data?: any) {
    this.modalController.dismiss(data);
  }

  payInfoPicker() {

  }
  payInfoChange(event) {
    this.payInfoLabel = '';
    this.payInfoLabel = this.payInfoArr.map(item => item.label).join(',');
    this.formData.payInfo = this.payInfoArr.map(item => item.value).join(',');
  }

  payInfoDismiss() {
  }

  submit() {
    this.formData.beginTime = this.formData.beginTime.split('T')[0];
    this.formData.endTime = this.formData.endTime.split('T')[0];
    this.dismiss({ formData: this.formData, payInfoArr: this.payInfoArr });
  }
}
