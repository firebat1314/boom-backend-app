import {
  NgModule,
  APP_INITIALIZER,
  isDevMode,
  enableProdMode,
} from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./pages/app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgZorroAntdMobileModule } from "ng-zorro-antd-mobile";
import { IonicStorageModule } from "@ionic/storage";
import { DefaultInterceptor } from "./providers/default.interceptor";
import { StartupService } from "./providers/startup.service";

import { LoggerModule, Level } from "@ngx-toolkit/logger";
import { environment } from "src/environments/environment";

export function StartupServiceFactory(
  startupService: StartupService
): Function {
  return () => startupService.load();
}

// enableProdMode()
const LOG_LEVEL: Level = environment.production ? Level.ERROR : Level.INFO;

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      backButtonText: "",
    }),
    IonicStorageModule.forRoot({
      name: "__mydb",
      // driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdMobileModule,
    LoggerModule.forRoot(LOG_LEVEL),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true }, //http拦截器
    {
      provide: APP_INITIALIZER,
      useFactory: StartupServiceFactory,
      deps: [StartupService],
      multi: true,
    }, //初始化执行
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
