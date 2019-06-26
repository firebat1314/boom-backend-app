import { Injectable } from '@angular/core';
import { HttpOptions, HttpService } from './http.service';
import { zip, from, of } from 'rxjs';
import { mergeMap, map, tap } from 'rxjs/operators';
import { StorageService } from './storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private storage: StorageService,
    private http: HttpService
  ) { }

  login(data?, options?: HttpOptions) {
    return zip(
      this.http.post('/sys/login', data, { showLoading: true, showToast: true, openDefultdata: true, ...options }),
    ).pipe(
      mergeMap(([res]) => {
        if (res.code === 0) {
          return zip(//必须等待token设置完成才能返回登录信息
            from(this.storage.setToken(res.token)),
          ).pipe(//
            map((token) => {
              // if (!token) this.myAlert.toast('token存储异常');
              return [res];
            })
          )
        }
        return of([res])
      }),
      tap(([res]) => {
        console.log(res)
      })
    );
  }
  logout(data = {}, options: HttpOptions = {}) {
    return this.http.post('/sys/logout', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  menuNav(data = {}, options: HttpOptions = {}) {
    return this.http.get('/sys/menu/nav', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
  userInfo(data = {}, options: HttpOptions = {}) {
    return this.http.get('/sys/user/info', data, { showLoading: true, showToast: true, openDefultdata: true, ...options });
  }
}
