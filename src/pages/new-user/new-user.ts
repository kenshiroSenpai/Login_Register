import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { FitnessPage } from '../fitness/fitness';

/**
 * Generated class for the NewUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-new-user',
  templateUrl: 'new-user.html',
})
export class NewUserPage implements OnInit {
  users: any = [];


  myForm: FormGroup;
  check = { "name": "", "email": "", "password": "" };
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private database: DatabaseProvider) {

  }

  ngOnInit(){
    this.myForm = new FormGroup({
      email: new FormControl('', [Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]),
      name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)]),
    });
  }

  CreateUser(myForm: {name: string, email: string, password: string}) {
    this.database.CreateUser(myForm.name, myForm.email, myForm.password, 0).then((data) => {
      this.navCtrl.push(FitnessPage);
    }, (error) => {
      console.log(error);
    });
  }

  GetAllUser() {
    this.database.getAllUsers().then((data) => {
      this.users = data;
      console.log("kenshi" + JSON.stringify(data));
    }, (error) => {
      console.log(error);
    });
  }

  BackPage(){
    this.navCtrl.pop();
  }

  getEmptyDatabase(){
    this.database.emptyDatabase().then((data) =>{
      console.log(data);
    }, (error) =>{
      console.log(error);
    });
  }
}
