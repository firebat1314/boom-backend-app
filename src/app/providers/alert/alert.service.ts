import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

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
    const toast = await this.toastController.create({
      duration: 2000,
      message: message,
      showCloseButton: showCloseButton,
      position: 'top',
      closeButtonText: '取消'
    });
    toast.present();
  }
}
