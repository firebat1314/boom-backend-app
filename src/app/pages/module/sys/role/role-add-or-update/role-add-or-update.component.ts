import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PopupService } from 'src/app/providers/popup/popup.service';
import { ApiService } from 'src/app/providers/api.service';
import * as $ from 'jquery';
import 'jstree';

@Component({
  selector: 'sss-role-add-or-update',
  templateUrl: './role-add-or-update.component.html',
  styleUrls: ['./role-add-or-update.component.scss'],
})
export class RoleAddOrUpdateComponent implements OnInit {

  formData = {
    roleName: '',
    remark: ''
  }

  menuList: any[] = [

  ];
  constructor(
    public modalController: ModalController,
    private popupServ: PopupService,
    public apiServ: ApiService
  ) {
    console.log($('sdsdsd').jstree)
  }

  ngOnInit() {
    this.apiServ.sysMenuList().subscribe(data => {
      this.menuList = data;
    })
  }
  dismiss() {

  }
  submit() {

  }

}
