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
    keyword: '35606',
    searchType: 'uaid',
    beginTime: '2019-05-08',
    endTime: '2019-08-31'
  };

  beginTime = new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 2);
  endTime = new Date();

  value3 = [];
  name3 = '请选择'
  singleArea = [
    { value: 'uaid', label: '账户ID查询' },
    { value: 'roleid', label: '游戏ID查询' },
    { value: 'account', label: '玩家账号查询' },
  ];


  constructor(
    public modalController: ModalController,
    public alert: AlertService,
  ) { }

  onOk3(result) {
    this.name3 = this.getResult(result);
    this.formData.searchType = result[0].value;
  }
  inputChange(e) {
    this.formData.keyword = e;
  }
  getResult(result) {
    this.value3 = [];
    result.forEach(item => {
      this.value3.push(item.label || item);
    });
    return this.value3.map(v => v).join(',');
  }

  ngOnInit() {
    this.singleArea.map((v) => {
      if (v.value == this.formData.searchType) {
        this.value3.push(v);
        this.name3 = v.label;
      }
    })
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
      this.alert.toast('请输入开始时间和结束时间');
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
