import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/providers/api.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'sss-chfirst',
  templateUrl: './chfirst.page.html',
  styleUrls: ['./chfirst.page.scss'],
})
export class ChfirstPage implements OnInit {

  @Input() date: string;
  dataList: any;
  constructor(
    private apiServ: ApiService,
    public modalController: ModalController,
  ) { }

  ngOnInit() {
    this.apiServ.statsChfirst({}, { urlParam: this.date }).subscribe(res => {
      if (res && res.code === 0) {
        this.dataList = res.list
      }
    })
  }

  dismiss(data?: any) {
    this.modalController.dismiss(data);
  }
}
