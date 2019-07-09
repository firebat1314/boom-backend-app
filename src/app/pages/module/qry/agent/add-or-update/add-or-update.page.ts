import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/providers/api.service';
import { HttpService } from 'src/app/providers/http.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'sss-add-or-update',
  templateUrl: './add-or-update.page.html',
  styleUrls: ['./add-or-update.page.scss'],
})
export class AddOrUpdatePage implements OnInit {

  @Input() id: string;
  @Input() flag: string;
  formData = {
    password: "",
    salt: "",
    userName: "",
    comfirmPassword: ''
  }
  status: any;
  constructor(
    private apiServ: ApiService,
    private http: HttpService,
    public modalController: ModalController,
  ) { }

  ngOnInit() {
    if (this.id) {
      this.apiServ.agentInfo({}, { urlParam: this.id }).subscribe(res => {
        if (res && res.code === 0) {
          this.formData.userName = res.user.username
          this.formData.salt = res.user.salt
          this.status = res.user.status
        }
      })
    }
  }

  dismiss(data?: any) {
    this.modalController.dismiss(data);
  }
  submit() {
    this.http.post(`/qry/${this.flag === 'agent' ? 'agent' : 'adv'}/${!this.id ? 'save' : 'update'}`, {}, {
      params: {
        'username': this.formData.userName,
        'password': this.formData.password,
        'comfirmPassword': this.formData.comfirmPassword,
        'salt': this.formData.salt
      }
    }).subscribe(res => {
      if (res && res.code === 0) {
        this.dismiss(res);
      }
    })
  }
}
