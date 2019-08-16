import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/providers/api.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'sss-record-list',
  templateUrl: './record-list.page.html',
  styleUrls: ['./record-list.page.scss'],
})
export class RecordListPage implements OnInit {

  dataList: any[] = [];
  roleId: string;
  recordId: string;
  gameType: string;
  name: string;
  data: any;
  channelId: string;
  useGold: string;

  constructor(
    private apiServ: ApiService,
    private route: ActivatedRoute,
    public navController: NavController,
  ) {
  }

  ngOnInit() {

    this.route
      .queryParamMap
      .subscribe(data => {
        this.roleId = data.get('roleId');
        this.recordId = data.get('recordId');
        this.gameType = data.get('gameType');
        this.name = data.get('name');
        this.channelId = data.get('channelId');
        this.useGold = data.get('useGold');
        this.getList();
      });
  }

  getList() {
    this.apiServ.qryGameNewDetail({
      roleId: this.roleId,
      recordId: this.recordId,
      gameType: this.gameType
    }).subscribe(data => {
      if (data && data.code === 0) {
        this.data = data;
        this.dataList = data.detailList;
      }
    });
  }

  doRefresh(event) {
    this.apiServ.qryGameNewDetail({
      roleId: this.roleId,
      recordId: this.recordId,
      gameType: this.gameType
    }, { showLoading: false }).subscribe(data => {
      event.target.complete();
      if (data && data.code === 0) {
        this.data = data;
        this.dataList = data.detailList;
      }
    });
  }
  gameDetail(item, index) {
    /* 
        let url = '';
        if (this.gameType === '5' || this.gameType === '9') {
          url = '../dragon';
        } else if (this.gameType === '8') {
          url = '../grabniu';
        } else if (this.gameType === '6') {
          url = '../animal';
        } else if (this.gameType === '7') {
          url = '../car';
        } else if (this.gameType === '10' || this.gameType === '15') {
          url = '../fish';
        } else if (this.gameType === '2') {
          url = '../lottery';
        } else if (this.gameType === '12') {
          url = '../landlords';
        } else {
          // 直接弹出来
          url = './details';
        } */

    this.navController.navigateForward(['./details'], {
      queryParams: {
        index: index,
        name: this.name,
        nick: this.data.nick,
        channelId: this.channelId,
        useGold: this.useGold,
        item: encodeURIComponent(JSON.stringify(item))
      },
      relativeTo: this.route
    });
  }
}
