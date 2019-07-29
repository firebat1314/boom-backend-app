import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/providers/api.service';
import { PopupService } from 'src/app/providers/popup/popup.service';

@Component({
  selector: 'sss-give',
  templateUrl: './give.page.html',
  styleUrls: ['./give.page.scss'],
})
export class GivePage implements OnInit {
  optionsChannel: any;
  channel: any;
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
    this.apiServ.giveData({
      'chId': this.channel
    }).subscribe(res => {
      if (res && res.code === 0) {
        this.dataList = res.list;
      }
    })
  }
}
