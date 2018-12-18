import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  private db: SQLiteObject;
  private open: boolean;

  constructor(public http: HttpClient, public storage: SQLite) {
    
    if(!this.open){
      this.storage = new SQLite();
      this.storage.create({name: "data.db", location: "default"}).then((db: SQLiteObject) => {
        this.db = db;
        db.executeSql("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT, email TEXT, password TEXT, fitpoints INTEGER)", []);
        this.open = true;
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  CreateUser(name:string, email: string, password: string, fitpoints: number){
    return new Promise ((resolve, reject) => {
      let sql = "INSERT INTO users (name, email, password, fitpoints) VALUES (?, ?, ?, ?)";
      this.db.executeSql(sql, [name, email, password, fitpoints]).then((data) =>{
        resolve(data);
      }), (error) =>{
        reject(error);
      }
    });
  }

  getAllUsers(){
    return new Promise ((resolve, reject) =>{
      this.db.executeSql("SELECT * FROM users", []).then((data) =>{
        let arrayUsers = [];
        if(data.rows.length > 0){
          for(var i = 0; i < data.rows.length; i++){
            arrayUsers.push({
              id: data.rows.item(i).id,
              name: data.rows.item(i).name,
              email: data.rows.item(i).email,
              password: data.rows.item(i).password,
              fitpoints: data.rows.item(i).fitpoints
            });
          }
        }
        resolve(arrayUsers);
      }, (error) => {
        reject(error);
      });
    });
  }
  emptyDatabase(){
    return new Promise((resolve, reject) =>{
      this.db.executeSql("DROP TABLE users").then((data) =>{
        resolve(data);
        this.open = false;
      }, (error) =>{
        reject(error);
      });
    });
  }
}
