import { Component, OnInit, ViewChild, Host, Inject, forwardRef } from '@angular/core';
import { NavigationExtras, ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { UtilsService } from 'src/app/providers/utils/utils.service';
import { baseurl } from 'src/app/providers/default.interceptor';
import { StorageService } from 'src/app/providers/storage/storage.service';
import { ApiService } from 'src/app/providers/api.service';
import { AnimationOptions } from '@ionic/angular/dist/providers/nav-controller';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'sss-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showPsw: boolean = false;
  public loginInfo = {
    'username': 'superAdmin',
    'password': '123456',
    'uuid': '',
    'captcha': ''
  };
  captchaPath: any;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private storage: StorageService,
    private myUtils: UtilsService,
    @Host() @Inject(forwardRef(() => AppComponent)) private childView: AppComponent
  ) { }

  ngOnInit() {
    this.getCaptcha();
    this.route.paramMap.subscribe(params => {
      let user_name = params.get('user_name');
      if (user_name) {
        this.loginInfo.username = user_name;
      } else {
        this.storage.getStorage('username').then(username => {
          if (username) {
            this.loginInfo.username = username;
          }
        })
      };
    });
  }

  goToHome(form) {
    if (!this.loginInfo.username) {
      this.toastTip('请填写用户名');
      return;
    }
    if (!this.loginInfo.password) {
      this.toastTip('请填写密码');
      return;
    }
    this.api.login(this.loginInfo).subscribe(([res]) => {
      this.childView.ngOnInit()
      if (res && res.code === 0) {
        this.storage.setStorage('username', this.loginInfo.username);
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.storage.redirectUrl ? this.storage.redirectUrl : '/home';
        // Set our navigation extras object
        // that passes on our global query params and fragment
        let navigationExtras: NavigationExtras | AnimationOptions = {
          queryParamsHandling: 'preserve',
          preserveFragment: true,
          animated: true
        };
        // Redirect the user
        this.navCtrl.navigateRoot([redirect], navigationExtras).then(() => {
          this.loginInfo.password = '';
          this.loginInfo.captcha = '';
        });
      } else {
        this.getCaptcha();//更新验证码
      }
    });
  }
  getCaptcha() {
    this.loginInfo.captcha = '';
    this.loginInfo.uuid = this.myUtils.getUUID();
    this.captchaPath = baseurl + (`/captcha.jpg?uuid=${this.loginInfo.uuid}`)
  }
  async toastTip(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

}
