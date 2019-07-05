import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/providers/alert/alert.service';

@Component({
  selector: 'sss-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  @Input() formData = {
    page: 1,
    limit: 10,
    keyword: '',
    beginTime: '2019-05-08',
    endTime: '2019-08-31',
    type: '',
    channel: '',
    status: '',
  };

  constructor(
    public modalController: ModalController,
    public alert: AlertService,
  ) { }


  ngOnInit() {

  }

  dismiss(data?: any) {
    this.modalController.dismiss(data);
  }

  submit() {
    if (!this.formData.beginTime || !this.formData.endTime) {
      this.alert.toast('请输入开始时间和结束时间');
      return
    }
    this.formData.beginTime = this.formData.beginTime.split('T')[0];
    this.formData.endTime = this.formData.endTime.split('T')[0];
    this.dismiss(this.formData);
  }

}
