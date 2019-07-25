import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PopupService } from 'src/app/providers/popup/popup.service';
import { ApiService } from 'src/app/providers/api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'sss-target',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.scss'],
})
export class TargetComponent implements OnInit {

  @Input() formData = {
    coin: null,
    content: "",
    ids: "",
    title: "",
  };
  constructor(
    public modalController: ModalController,
    private popupServ: PopupService,
    private apiServ: ApiService,
  ) { }


  ngOnInit() {

  }

  dismiss(data?: any) {
    this.modalController.dismiss(data);
  }


  submit(f: NgForm) {
    if (f.valid) {
      this.apiServ.funcMailTarget({
        'ids': this.formData.ids,
        'title': this.formData.title,
        'content': this.formData.content,
        'coin': this.formData.coin * 100
      }).subscribe(res => {
        if (res && res.code === 0) {
          this.dismiss(res);
        }
      })
    }
  }
}
