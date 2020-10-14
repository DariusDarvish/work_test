import { Injectable } from '@angular/core';
import { EmaillistService } from 'src/services&Validtors/emaillist.service'
import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SharedService } from 'src/services&Validtors/shared.service';

@Injectable({ providedIn: 'root' })
export class Email4SettingsValidator {
  holder = ''
  endpoint = this.sharedService.sharedurl_prefix.subscribe(
    dataa => { console.log(dataa); this.holder = dataa }
    , errr => { console.log("error:", errr); }
  )
  constructor(private http: HttpClient, private sharedService: SharedService) { }

  validateEmailNotTaken(control: AbstractControl) {
    return this.checkEmailNotTaken(control.value).pipe(
      map(res => {
        return res ? null : { emailTaken: true };
      })
    );

  }


  checkEmailNotTaken(email: string) {
    return this.http.get(this.holder + "accounts/user_email_4_setting/").pipe(
      map((emailList: Array<any>) =>
        emailList.filter(user => user.email === email)
      ),
      map(email => !email.length)
    );
  }

}