import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/providers/api.service';
import { PopupService } from 'src/app/providers/popup/popup.service';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'sss-web',
  templateUrl: './web.page.html',
  styleUrls: ['./web.page.scss'],
})
export class WebPage implements OnInit {
  @ViewChild('sortInput', { static: false }) input: IonInput;

  optionsChannel: any;
  channel: any;
  url: any;
  editor: boolean = false;

  constructor(
    private apiServ: ApiService,
    private popupServ: PopupService
  ) { }

  ngOnInit() {
    this.getChannel();
  }
  getChannel() {
    this.apiServ.gameChannel().subscribe(data => {
      if (data && data.code === 0) {
        this.optionsChannel = data.channelList;
        this.channel = data.channelList[0].channelId;
      }
    })
  }
  channelChange() {
    this.getData();
  }
  getData() {
    this.apiServ.gameData({
      chId: this.channel
    }).subscribe(data => {
      if (data && data.code === 0) {
        this.url = data.webDate;
      }
    })
  }
  confirm() {
    let value = this.input.value;
    if (!value) {
      this.popupServ.toast('请填写网址');
      return false;
    }
    this.apiServ.gameAdmin({
      'basename': value,
      'chaId': this.channel || -1
    }).subscribe(data => {
      if (data && data.code === 0) {
        this.popupServ.toast('操作成功');
        this.editor = false;
        this.getData();
      }
    })
  }
}
