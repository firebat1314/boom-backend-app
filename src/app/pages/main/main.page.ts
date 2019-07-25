import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/providers/api.service';
import { StorageService } from 'src/app/providers/storage/storage.service';
import { UtilsService } from 'src/app/providers/utils/utils.service';
import { NavController, AlertController } from '@ionic/angular';
import { MenuListService } from '../../pages/main/menu-list.service';

@Component({
  selector: 'sss-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(
    private api: ApiService,
    private storage: StorageService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private utils: UtilsService,
    public menuListServ: MenuListService,
    public nav: NavController,
  ) { }

  ngOnInit() {
  }
  onChange(event) {
    // console.log(event);
  }
  routerLink(url: any, menu) {
    this.nav.navigateForward([url], {
      animated: true
    }).then(() => {
      menu.close();
    });
  }
  async logout() {
    let alertCtrl = await this.alertCtrl.create({
      header: '确认退出',
      buttons: [
        {
          text: '取消'
        },
        {
          text: '确认',
          handler: () => {
            this.api.logout().subscribe(res => {
              this.storage.clearLoginInfo().subscribe(() => {
                this.navCtrl.navigateRoot('/login', { animated: true });
              });
            })
          }
        }
      ]
    })
    alertCtrl.present();
  }
}
