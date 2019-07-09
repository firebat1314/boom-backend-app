import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'sss-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  @Input() formData = {
    'page': 1,
    'limit': 10,
    'beginTime': '2019-05-08',
    'endTime': '2019-08-31',
  };
  constructor(
    public modalController: ModalController,
  ) { }


  ngOnInit() {

  }

  dismiss(data?: any) {
    this.modalController.dismiss(data);
  }


  submit() {
    this.formData.beginTime = this.formData.beginTime.split('T')[0];
    this.formData.endTime = this.formData.endTime.split('T')[0];
    this.dismiss({ formData: this.formData });
  }
}
