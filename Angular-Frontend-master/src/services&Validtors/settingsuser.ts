import { Injectable } from '@angular/core';
import { EmaillistService } from 'src/services&Validtors/emaillist.service'
import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SharedService } from 'src/services&Validtors/shared.service';

@Injectable({ providedIn: 'root' })
export class User4SettingsValidator {
  holder = ''
  endpoint = this.sharedService.sharedurl_prefix.subscribe(
    dataa => { console.log(dataa); this.holder = dataa }
    , errr => { console.log("error:", errr); }
  )
  constructor(private http: HttpClient, private sharedService: SharedService) { }

  validateUsernameNotTaken(control: AbstractControl) {
    return this.checkUsernameNotTaken(control.value).pipe(
      map(res => {
        return res ? null : { usernameTaken: true };
      })
    );
  }


  checkUsernameNotTaken(username: string) {
    return this.http.get(this.holder + "accounts/user_username_4_setting/").pipe(
      map((usernameList: Array<any>) =>
        usernameList.filter(user => user.username === username)
      ),
      map(users => !users.length)
    );
  }

}