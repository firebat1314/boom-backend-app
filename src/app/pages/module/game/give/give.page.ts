import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/providers/api.service';
import { PopupService } from 'src/app/providers/popup/popup.service';
import { ModalController } from '@ionic/angular';
import { RestrictComponent } from './restrict/restrict.component';
import { ChangeComponent } from './change/change.component';

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
    public modalController: ModalController,
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
  async  detailClick(item: any, index: any) {
    const modal = await this.modalController.create({
      component: RestrictComponent,
      componentProps: {
        index: index,
        channelId: this.channel
      }
    });
    modal.onWillDismiss().then(({ data }) => {
      if (data && data.dismissed) {
        this.getData();
      }
    });
    return await modal.present();
  }
  async loanUpdateClick(item: any, index: any) {
    const modal = await this.modalController.create({
      component: ChangeComponent,
      componentProps: {
        index: index,
        channel: this.channel,
        giftAmount: item.giftAmount / 100,
        forbid: item.forbidVal
      }
    });
    modal.onWillDismiss().then(({ data }) => {
      if (data && data.dismissed) {
        this.getData();
      }
    });
    return await modal.present();
  }
}
