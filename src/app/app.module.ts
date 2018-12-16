import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NewUserPage } from '../pages/new-user/new-user';
import { LoginPage } from '../pages/login/login';
import { FitnessPage } from '../pages/fitness/fitness';
import { DatabaseProvider } from '../providers/database/database';

import { SQLite } from '@ionic-native/sqlite';
import { HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NewUserPage,
    LoginPage,
    FitnessPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NewUserPage,
    LoginPage,
    FitnessPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider
  ]
})
export class AppModule {}
