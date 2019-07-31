import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/providers/api.service';
import { ModalController } from '@ionic/angular';
import { PopupService } from 'src/app/providers/popup/popup.service';

@Component({
  selector: 'sss-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss'],
})
export class AddAdminComponent implements OnInit {

  @Input() userId: number;
  formData = {
    id: 0,
    userName: '',
    password: '',
    comfirmPassword: '',
    salt: '',
    email: '',
    mobile: '',
    roleIdList: [],
    status: 1,
    channelId: ''
  }
  options: any[] = [];
  roleList: any[] = [];
  constructor(
    private apiServ: ApiService,
    private modalController: ModalController,
    private popupServ: PopupService,
  ) { }

  ngOnInit() {
    this.formData.id = this.userId;
    this.formData.id && this.getUserInfo();
    this.getChannel();
    this.getRoleList();
  }

  getChannel() {
    this.apiServ.sysUserChannels().subscribe(data => {
      if (data && data.code === 0) {
        this.options = data.channelList;
      }
    })
  }
  getRoleList() {
    this.apiServ.sysRoleSelect().subscribe(data => {
      if (data && data.code === 0) {
        this.roleList = data.list;
      }
    })
  }
  getUserInfo() {
    this.apiServ.sysUserInfo({}, { urlParam: this.formData.id + '' }).subscribe(data => {
      if (data && data.code === 0) {
        this.formData.userName = data.user.username;
        this.formData.salt = data.user.salt;
        this.formData.email = data.user.email;
        this.formData.mobile = data.user.mobile;
        this.formData.roleIdList = data.user.roleIdList;
        this.formData.status = data.user.status;
        this.formData.channelId = data.user.channelId;
      }
    })
  }

  dismiss(data?: any) {
    this.modalController.dismiss(data);
  }

  submit() {
    if (!this.formData.userName) {
      this.popupServ.toast('12121');
      return
    }

    let func = '';
    if (this.formData.id) {
      func = 'sysUserUpdate';
    } else {
      func = 'sysUserSave';
    }
    this.apiServ[func]({
      'userId': this.formData.id || undefined,
      'username': this.formData.userName,
      'password': this.formData.password,
      'salt': this.formData.salt,
      'email': this.formData.email,
      'mobile': this.formData.mobile,
      'status': this.formData.status,
      'roleIdList': this.formData.roleIdList,
      'channelId': this.formData.channelId
    }).subscribe(data => {
      if (data && data.code === 0) {
        this.popupServ.toast('操作成功');
        this.dismiss({ dismissed: true });
      }
    })
  }
}
