import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FitnessPage } from '../fitness/fitness';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {

  check = { "name": "", "email": "", "password": "" };
  loadUser: any = [];
  myForm: FormGroup;
  entry: Boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: DatabaseProvider, private alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      email: new FormControl('', [Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]),
      name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)]),
    });
  }


  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Some of the data is wrong, please check the data',
      buttons: ['OK']
    });
    alert.present();
  }

  userVerification(myForm: { name: string, email: string, password: string }) {
    this.database.getAllUsers().then((data) => {
      this.loadUser = data;
      this.entry = false;
      for (let i = 0; i < this.loadUser.length; i++) {
        if (this.loadUser[i].name == myForm.name && this.loadUser[i].email == myForm.email && this.loadUser[i].password == myForm.password) {
          this.navCtrl.push(FitnessPage);
          this.entry = true;
        }
      }
      if(!this.entry){
        this.presentAlert();
      }
    }, (error) => {
      console.log(error);
    });
  }

}
