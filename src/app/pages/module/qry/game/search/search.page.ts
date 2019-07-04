import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/providers/alert/alert.service';
import { ApiService } from 'src/app/providers/api.service';
import { qryGameForm } from '../game.page';

@Component({
  selector: 'sss-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  @Input() formData: qryGameForm = {
    page: null,
    limit: null,
    gameType: null,
    keyword: null,
    beginTime: null,
    endTime: null,
  };
  options: any[];

  constructor(
    public modalController: ModalController,
    public alert: AlertService,
    public apiServ: ApiService
  ) {
  }

  ngOnInit() {
    this.getGameType();
  }

  dismiss(data?: any) {
    this.modalController.dismiss(data);
  }

  getGameType() {
    this.apiServ.gameType().subscribe(data => {
      if (data && data.code === 0) {
        var options = new Array()
        for (let i = 0; i < data.gameType.length; i++) {
          var item = { value: data.gameType[i].id, label: '' + data.gameType[i].name }
          options.push(item)
        }
        this.options = options;

      } else {
        this.options = [];
      }
    })
  }
  submit() {
    if (this.formData.keyword.trim() === '') {
      this.alert.toast('请输入关键字');
      return
    }

    if (!this.formData.beginTime || !this.formData.endTime) {
      this.alert.toast('请输入开始时间和结束时间');
      return
    }
    this.formData.beginTime = this.formData.beginTime.split('T')[0];
    this.formData.endTime = this.formData.endTime.split('T')[0];
    this.dismiss(this.formData);
  }
}
