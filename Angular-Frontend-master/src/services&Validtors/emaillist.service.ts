import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmaillistService {
  emailList = [];
  emailClear = [];
  usernameClear = [];
  emaillistone = [];
  emailClearone = [];
  userNameListClearone = [];

  userNameClearone = []
  constructor(private http: HttpClient) { }

  getemails() {
    return this.http.get('http://127.0.0.1:8000/accounts/UserDataEmail/').subscribe((data: any[]) => {
      let tmp = [];

      for (let key in data)
        if (data.hasOwnProperty(key))
          tmp.push(data[key])


      this.emaillistone = tmp

      var arrayLength = this.emaillistone.length;
      for (var i = 0; i < arrayLength; i++) {
        this.emailList.push(this.emaillistone[i].email);
        //Do something
      }
      console.log(this.emailList)


    })
  }

  findemail() {
    return this.http.get('http://127.0.0.1:8000/accounts/user_email/').subscribe((data: any[]) => {
      let tmp = [];

      for (let key in data)
        if (data.hasOwnProperty(key))
          tmp.push(data[key])


      this.emailClearone = tmp

      var arrayLength = this.emailClearone.length;
      for (var i = 0; i < arrayLength; i++) {
        this.emailClear.push(this.emailClearone[i].email);
        //Do something
      }
      console.log(this.emailClear)
    })
  }

  removeemail() {
    this.getemails()
    this.findemail()


    setTimeout(() => {
      console.log('email here')
      console.log(this.emailClear[0])
      var x
      for (x = 0; x < this.emailList.length; x++) {

        if (this.emailList[x] == this.emailClear[0]) {
          delete this.emailList[x]
          console.log(this.emailList)
          return this.emailList
        }
        else {

        }
      }




    }, 1200)
    console.log(this.emailList)
  }




}
