import { Injectable, Injector } from "@angular/core";
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
} from "@angular/common/http";

import { Observable, of, throwError, from, zip } from "rxjs";
import {
  catchError,
  map,
  tap,
  finalize,
  switchMap,
  mergeMap,
  timeout,
} from "rxjs/operators";
import { PopupService } from "./popup/popup.service";
import { StorageService } from "./storage/storage.service";
import { NavController } from "@ionic/angular";
import { LoggerService } from "@ngx-toolkit/logger";

export interface HttpOptions {
  showLoading?: Boolean;
  timeout?: Number;
  showToast?: Boolean;
  openDefultdata?: Boolean;
  postParamsByBody?: Boolean;
  params?: any;
  urlParam?: string;
}

@Injectable({
  providedIn: "root",
})
export class HttpService {
  loading: Promise<HTMLIonLoadingElement>;

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private injector: Injector,
    private popupServ: PopupService
  ) {}

  goTo(url: string) {
    setTimeout(() => this.injector.get(NavController).navigateRoot([url]));
  }
  /**
   *  GET请求处理（一般用于获取数据）
   * @param url 后台接口api 例如：/api/test/6
   */
  get(url: string, data = {}, options?: HttpOptions): Observable<any> {
    let opt = {
      showLoading: true,
      showToast: true,
      openDefultdata: true,
      ...options,
    };
    let pms: Promise<any>;
    if (opt.showLoading) {
      pms = this.popupServ.loading();
    } else {
      pms = new Promise(resolve => resolve(false));
    }
    return from(pms).pipe(
      switchMap(loadingElm => {
        loadingElm && loadingElm.present();

        let defaults = {
          t: new Date().getTime(),
        };
        opt.openDefultdata ? Object.assign(data, defaults) : data;

        return this.http
          .get(`${url}${opt.urlParam ? `/` + opt.urlParam : ``}`, {
            params: data,
          })
          .pipe(
            map(res => {
              return this.extractData(res, opt);
            }),
            finalize(() => {
              loadingElm && loadingElm.dismiss();
            }),
            catchError((err: HttpErrorResponse) => {
              return this.handleData(err, opt);
            })
          );
      })
    );
  }

  /**
   * POST请求处理（一般用于保存数据）
   * @param url 后台接口api
   * @param data 参数
   */
  post(url: string, data = {}, options?: HttpOptions): Observable<any> {
    let opt = {
      showLoading: true,
      showToast: true,
      openDefultdata: true,
      ...options,
    };
    let pms: Promise<any>;
    if (opt.showLoading) {
      pms = this.popupServ.loading();
    } else {
      pms = new Promise(resolve => resolve(false));
    }
    return from(pms).pipe(
      switchMap(loadingElm => {
        loadingElm && loadingElm.present();

        let defaults = {
          t: new Date().getTime(),
        };
        opt.openDefultdata ? Object.assign(data, defaults) : data;
        // opt.openDefultdata ? Object.assign(opt.params, defaults) : opt.params;

        return this.http
          .post(`${url}${opt.urlParam ? `/` + opt.urlParam : ``}`, data, {
            params: opt.params,
          })
          .pipe(
            map(res => {
              return this.extractData(res, opt);
            }),
            finalize(() => {
              loadingElm && loadingElm.dismiss();
            }),
            catchError((err: HttpErrorResponse) => {
              return this.handleData(err, opt);
            })
          );
      })
    );
  }
  /**
   * PUT请求处理（一般用于更新数据）
   * @param url 后台接口api 例如：/api/test/6
   * @param data 参数
   */
  put(url: string, data = {}, options: HttpOptions): Observable<any> {
    let opt = {
      showLoading: true,
      showToast: true,
      openDefultdata: true,
      ...options,
    };
    let pms: Promise<any>;
    if (opt.showLoading) {
      pms = this.popupServ.loading();
    } else {
      pms = new Promise(resolve => resolve(false));
    }
    return from(pms).pipe(
      switchMap(loadingElm => {
        loadingElm && loadingElm.present();

        let defaults = {
          t: new Date().getTime(),
        };
        opt.openDefultdata && data ? Object.assign(data, defaults) : data;

        return this.http
          .put(`${url}${opt.urlParam ? `/` + opt.urlParam : ``}`, data, {
            params: opt.params,
          })
          .pipe(
            map(res => {
              return this.extractData(res, opt);
            }),
            finalize(() => {
              loadingElm && loadingElm.dismiss();
            }),
            catchError((err: HttpErrorResponse) => {
              return this.handleData(err, opt);
            })
          );
      })
    );
  }
  /**
   * DELETE请求处理（一般用于删除数据）
   * @param url 后台接口api 例如：/api/test/6
   */
  delete(url: string): Observable<{}> {
    return this.http.delete(url).pipe(
      map(res => {
        return this.extractData(res);
      }),
      catchError((err: HttpErrorResponse) => {
        return this.handleData(err);
      })
    );
  }

  /**
   *  提取数据
   * @param res 返回结果
   */
  private extractData(res, options?: HttpOptions) {
    let body = res;
    if (body.code == 500) {
      options.showToast && this.popupServ.toast(body.msg);
    } else if (body.code == 401) {
      options.showToast && this.popupServ.toast(body.msg);
      this.storage.clearLoginInfo().subscribe(() => {
        //退出登录
        this.goTo("/login");
      });
      options.showToast && this.popupServ.toast(body.msg);
    }
    return body || {};
  }
  /**
   * 错误消息类
   * @param error
   */
  private handleData(
    error: HttpErrorResponse,
    options?: HttpOptions
  ): Observable<any> {
    switch (error.status) {
      case 200:
        break;
      case 401: // 未登录状态码
        this.popupServ.toast("401");
        this.storage.clearLoginInfo().subscribe(() => {
          //退出登录
          this.goTo("/login");
        });
        break;
      case 403:
        this.popupServ.toast("403");
        break;
      case 404:
        this.popupServ.toast("NOT FOUND");
        break;
      case 500:
        this.popupServ.toast("500");
        // this.goTo(`/ ${ event.status }`);
        break;
    }
    return of(error);
  }
}
