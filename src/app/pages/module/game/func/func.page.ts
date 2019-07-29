import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/providers/api.service';
import { PopupService } from 'src/app/providers/popup/popup.service';

@Component({
  selector: 'sss-func',
  templateUrl: './func.page.html',
  styleUrls: ['./func.page.scss'],
})
export class FuncPage implements OnInit {

  optionsChannel: any;
  channel: any;
  editor: boolean = false;
  dataList: any;

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
    this.apiServ.funcData({
      chId: this.channel
    }).subscribe(data => {
      if (data && data.code === 0) {
        this.dataList = data.list
      }
    })
  }
  stateChange(state, index) {
    this.apiServ.funcManage({
      'chId': this.channel,
      'state': state ? 0 : 1,
      'index': index
    }).subscribe(data => {
      if (data && data.code === 0) {
        this.popupServ.toast('操作成功');
        this.editor = false;
        this.getData();
      } else {
        state = !state
      }
    })
  }

}
