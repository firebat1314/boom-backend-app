import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PopupService } from 'src/app/providers/popup/popup.service';

@Component({
  selector: 'sss-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  @Input() formData = {
    page: 1,
    limit: 10,
    keyword: '35606',
    type: '',
    beginTime: '2019-05-08',
    endTime: '2019-08-31'
  };

  constructor(
    public modalController: ModalController,
    private popupServ: PopupService,
  ) { }


  ngOnInit() {

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
