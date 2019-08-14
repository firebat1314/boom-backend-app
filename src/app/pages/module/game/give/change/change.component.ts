import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/providers/api.service';
import { ModalController } from '@ionic/angular';
import { PopupService } from 'src/app/providers/popup/popup.service';

@Component({
  selector: 'sss-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss'],
})
export class ChangeComponent implements OnInit {
  @Input() index: any;
  @Input() channel: any;
  @Input() giftAmount: any;
  @Input() forbid: any = '';;
  checkList: any[] = [];
  giveType: string;

  constructor(
    private apiServ: ApiService,
    private modalController: ModalController,
    private popupServ: PopupService,
  ) { }

  ngOnInit() {
    console.log(this.index, this.channel, this.giftAmount, this.forbid)
    if (0 === this.index) {
      this.giveType = '注册赠送'
      this.index = 9
    } else if (1 === this.index) {
      this.giveType = '初始赠送'
      this.index = 20
    }
    this.checkList = this.forbid.split(',');
  }

  dismiss(data?: any) {
    this.modalController.dismiss(data);
  }
  confirm() {
    let forbid = this.checkList.join(',');
    this.apiServ.gameGiveModify({
      'type': this.index,
      'gold': this.giftAmount * 100,
      'forbid': forbid,
      'chId': this.channel
    }).subscribe(data => {
      if (data && data.code === 0) {
        this.popupServ.toast('修改成功');
        this.dismiss({
          dismissed: true
        });
      }
    })
  }
}
