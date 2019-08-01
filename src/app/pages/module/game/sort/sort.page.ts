import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/providers/api.service';
import { IonInput } from '@ionic/angular';
import { PopupService } from 'src/app/providers/popup/popup.service';

@Component({
  selector: 'sss-sort',
  templateUrl: './sort.page.html',
  styleUrls: ['./sort.page.scss'],
})
export class SortPage implements OnInit {
  @ViewChild('sortInput', { static: false }) input: IonInput;

  optionsChannel: any;
  channel: any;
  gameSort: any;
  editor: boolean = false;
  gameName = [
    { id: 2, name: '时时彩' },
    { id: 3, name: '水果乐园' },
    { id: 4, name: '水浒' },
    { id: 5, name: '百人牛牛' },
    { id: 6, name: '飞禽走兽' },
    { id: 7, name: '奔驰宝马' },
    { id: 8, name: '抢庄牛牛' },
    { id: 9, name: '龙虎斗' },
    { id: 10, name: '3D捕鱼' },
    { id: 11, name: '扫雷红包' },
    { id: 12, name: '斗地主' },
    { id: 13, name: '扎金花' },
    { id: 14, name: '百家乐' },
    { id: 15, name: '2D捕鱼' },
    { id: 16, name: '二八杠' },
    { id: 17, name: '红黑大战' },
    { id: 18, name: '视讯百家乐' }
  ]
  sort: any = [];
  dataList: any = [];
  keyword: string = '';
  constructor(
    private apiServ: ApiService,
    private popupServ: PopupService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.getChannel();
    }, 0);
  }
  ngAfterViewInit() {
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
    this.getSort();
  }
  getSort() {
    this.apiServ.gameSort({
      chId: this.channel
    }).subscribe(data => {
      if (data && data.code === 0) {
        if (data.list.length > 0) {
          this.gameSort = data.list[0].games;
          this.sortSort(this.gameSort)
        }
      }
    })
  }
  sortSort(datas) {
    if (!datas) {
      return
    }
    var data = datas.split(',').reverse()
    var data1 = []
    let yu = data.length % 2
    let len = yu > 0 ? Math.floor(data.length / 2) + 1 : data.length / 2
    let gamename = ''
    let jj = 0
    let wei = 0
    this.dataList = []
    for (var i = data.length - 1; i >= 0; i--) {
      data1[wei] = data[i]
      wei += 1
    }
    for (let i = 0; i < len; i++) {
      if (yu > 0 && len - 1 === i) {
        this.sort = [{ name: '' }]
      } else {
        this.sort = [{ name: '' }, { name: '' }]
      }
      for (let j = 0; j < (yu > 0 && len - 1 === i ? 1 : 2); j++) {
        jj = (j === 0 ? 2 : 1)
        if (yu > 0 && j === 1 && i === len - 1) {//最后一组游戏可能为单个
          jj = 2
        }
        jj = (i + 1) * 2 - jj
        for (let g = 0; g < this.gameName.length; g++) {
          if (data1[jj] == this.gameName[g].id) {
            gamename = this.gameName[g].name
          }
        }
        this.sort[j] = { name: data1[jj] + '.' + gamename }
      }
      this.dataList[i] = this.sort
    }
  }
  confirm() {
    let value = this.input.value;
    if (value.split(',').length != this.gameName.length) {
      this.popupServ.toast('请确认游戏数量');
      return false;
    }
    this.apiServ.gameEditSort({
      'sort': value,
      'chId': this.channel,
    }).subscribe(data => {
      if (data && data.code === 0) {
        this.popupServ.toast('操作成功');
        this.editor = false;
        this.getSort();
      }
    })
  }
}
