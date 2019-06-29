import { Injectable } from '@angular/core';
import { zip, from } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  token: any;
  redirectUrl: string;//记录登录前路由链接用于登陆后重定向
  isLogin: Boolean;

  constructor(
    public storage: Storage,
  ) { }

  setToken(value) {
    return this.storage.set('APP_TOKEN', value).then(res => {
      this.token = value;
      return res;
    });
  }
  removeToken() {
    return this.storage.remove('APP_TOKEN').then(res => {
      this.token = null;
    });
  }
  setStorage(key, value) {
    return this.storage.set(key, value);
  }
  getStorage(value) {
    return this.storage.get(value);
  }
  removeStorage(key) {
    return this.storage.remove(key);
  }
  getToken() {
    return zip(
      from(this.getStorage('APP_TOKEN')),
    ).pipe(
      //switchMap()
    ).toPromise().then(([token]) => {
      this.token = token;
      return [token];
    })
  }

  clearLoginInfo() {
    this.isLogin = false;
    return zip(
      from(this.removeToken()),
      from(this.removeStorage('LOGIN_INFO')),
    )
  }
}
