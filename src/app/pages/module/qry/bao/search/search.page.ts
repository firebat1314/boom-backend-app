import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QryBaoDepositForm } from '../deposit/deposit.page';
import { PopupService } from 'src/app/providers/popup/popup.service';

@Component({
  selector: 'sss-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  @Input() formData: QryBaoDepositForm;

  name = '选择';

  beginTime = new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 2);
  endTime = new Date();

  constructor(
    public modalController: ModalController,
    private popupServ: PopupService,
  ) { }

  ngOnInit() {
    if (this.formData.beginTime) {
      this.beginTime = new Date(+this.formData.beginTime.split('-')[0], +this.formData.beginTime.split('-')[1] - 1, +this.formData.beginTime.split('-')[2]);
    }
    if (this.formData.endTime) {
      this.endTime = new Date(+this.formData.endTime.split('-')[0], +this.formData.endTime.split('-')[1] - 1, +this.formData.endTime.split('-')[2]);
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
    this.dismiss(this.formData);
  }

  currentDateFormat(date, format: string = 'yyyy-mm-dd HH:MM'): any {
    const pad = (n: number): string => (n < 10 ? `0${n}` : n.toString());
    let str = format
      .replace('yyyy', date.getFullYear())
      .replace('mm', pad(date.getMonth() + 1))
      .replace('dd', pad(date.getDate()))
      .replace('HH', pad(date.getHours()))
      .replace('MM', pad(date.getMinutes()))
      .replace('ss', pad(date.getSeconds()));
    return str;
  }
  onOk1(result: Date) {
    this.formData.beginTime = this.currentDateFormat(result, 'yyyy-mm-dd');
    this.beginTime = result;
  }
  onOk2(result: Date) {
    this.formData.endTime = this.currentDateFormat(result, 'yyyy-mm-dd');
    this.endTime = result;
  }
}
