import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/providers/api.service';
import { PopupService } from 'src/app/providers/popup/popup.service';

@Component({
  selector: 'sss-forbid',
  templateUrl: './forbid.component.html',
  styleUrls: ['./forbid.component.scss'],
})
export class ForbidComponent implements OnInit {
  @Input() roleId: any;
  @Input() gameForbid: any;
  status: any;
  point: string;
  gameChecked: Array<any>;
  gamesArr = [
    {
      name: '打地鼠', value: '1'
    }, {
      name: '开心彩', value: '2'
    }, {
      name: '水果', value: '3'
    }, {
      name: '水浒传', value: '4'
    }, {
      name: '百人牛牛', value: '5'
    }, {
      name: '飞禽走兽', value: '6'
    }, {
      name: '奔驰宝马', value: '7'
    }, {
      name: '抢庄牛牛', value: '8'
    }, {
      name: '龙虎斗', value: '9'
    }, {
      name: '3D捕鱼', value: '10'
    }, {
      name: '扫雷红包', value: '11'
    }, {
      name: '斗地主', value: '12'
    }, {
      name: '扎金花', value: '13'
    }, {
      name: '百家乐', value: '14'
    }, {
      name: '2D捕鱼', value: '15'
    }, {
      name: '二八杠', value: '16'
    }, {
      name: '红黑大战', value: '17'
    }, {
      name: '视讯百家乐', value: '18'
    }
  ]

  constructor(
    public modalController: ModalController,
    private popupServ: PopupService,
    public apiServ: ApiService
  ) { }

  ngOnInit() {
    this.point = this.gameForbid.point || 0
    this.status = this.gameForbid.status + '';

    if (this.gameForbid.gamesArr) {
      this.gameChecked = this.gameForbid.gamesArr;
    }
  }
  dismiss(data?: any) {
    this.modalController.dismiss(data);
  }
  keyup() {
    this.point = this.point.replace(/[^\d]/g, '');
  }

  submit() {
    const reg = /^(([0-9]+\d*))$/
    if (!reg.test(this.point)) {
      return
    }
    let checked = {};
    for (let i = 0; i < this.gamesArr.length; i++) {
      const ele = this.gamesArr[i];
      checked['gameChecked' + (i + 1)] = false;
      for (let j = 0; j < this.gameChecked.length; j++) {
        const c = this.gameChecked[j];
        if (c == ele.value) {
          checked['gameChecked' + (i + 1)] = true;
        }
      }
    }
    this.apiServ.forbidgames(null, {
      params: {
        'roleId': this.roleId,
        'status': this.status,
        'point': this.point,
        'gameChecked': JSON.stringify(checked),
      }
    }).subscribe((data) => {
      if (data && data.code === 0) {
        this.popupServ.toast('操作成功').then(() => {
          this.dismiss({
            'dismissed': true
          });
        });
      }
    })
  }
}
