import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewUserPage } from '../new-user/new-user';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, ) {

  }

  CheckIn(){
    this.navCtrl.push(NewUserPage);
  }
  LogIn(){
    this.navCtrl.push(LoginPage);
  }
}
