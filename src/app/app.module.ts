import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';

import { AppRoutingModule } from './app-routing.module';

import { HttpModule } from '@angular/http'

import { baseURL } from '../shared/baseurl'

import { DishProvider } from '../app/providers/dish.service'
import { LeaderProvider } from '../app/providers/leader.service'
import { PromotionProvider } from '../app/providers/promotion.service'
import { ProcessHttpmsgService } from '../app/providers/process-httpmsg.service'
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { ReservationPageModule } from '../app/reservation/reservation.module'
import { FormBuilder } from '@angular/forms'

import { DishCommentsPageModule } from '../app/dish-comments/dish-comments.module'

import { LoginPageModule } from '../app/login/login.module'

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

import { EmailComposer } from '@ionic-native/email-composer/ngx';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { Network } from '@ionic-native/network/ngx';

import { CallNumber } from '@ionic-native/call-number/ngx';

import { File } from '@ionic-native/file/ngx';


@NgModule({
  declarations: [AppComponent,  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(),
    AppRoutingModule, 
    RouterModule,
    ReservationPageModule,
    DishCommentsPageModule,
    LoginPageModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    CallNumber,
    Network,
    Camera,
    File,
    SocialSharing,
    EmailComposer,
    LocalNotifications,
    StatusBar,
    SplashScreen,
    DishProvider,
    LeaderProvider,
    PromotionProvider,
    ProcessHttpmsgService,
    InAppBrowser,
    FormBuilder,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: 'BaseURL', useValue: baseURL }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
