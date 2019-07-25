import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PopupService } from 'src/app/providers/popup/popup.service';
import { ApiService } from 'src/app/providers/api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'sss-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.scss'],
})
export class GlobalComponent implements OnInit {
  @Input() formData = {
    beginTime: null,
    content: null,
    endTime: null,
    title: null,
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
      this.formData.beginTime = this.formData.beginTime.split('T')[0];
      this.formData.endTime = this.formData.endTime.split('T')[0];
      this.apiServ.funcMailGlobal({
        'title': this.formData.title,
        'content': this.formData.content,
        'beginTime': this.formData.beginTime,
        'endTime': this.formData.endTime,
      }).subscribe(res => {
        if (res && res.code === 0) {
          this.dismiss(res);
        }
      })
    }
  }
}
