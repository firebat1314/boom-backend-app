import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  showToastTime: any = true;//防止重复提醒

  constructor(
    public loadingController: LoadingController,
    public toastController: ToastController,
  ) {

  }
  loading(message = '') {
    return this.loadingController.create({
      duration: 20000,
      message: message,
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
  }
  async toast(message, showCloseButton = true) {
    if (this.showToastTime) {
      const toast = await this.toastController.create({
        duration: 2000,
        message: message,
        showCloseButton: showCloseButton,
        position: 'top',
        closeButtonText: '取消'
      });
      toast.present();
      this.showToastTime = false;
      setTimeout(() => {
        this.showToastTime = true;
      }, 2000);
    }
  }
}
