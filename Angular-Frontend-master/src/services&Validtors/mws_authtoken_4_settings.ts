import { Injectable } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { UserinfoService } from 'src/services&Validtors/userinfo.service';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SharedService } from 'src/services&Validtors/shared.service';


@Injectable()
export class AuthTokenValidator4Settings {
  holder = ''
  endpoint = this.sharedService.sharedurl_prefix.subscribe(
    dataa => { console.log(dataa); this.holder = dataa }
    , errr => { console.log("error:", errr); }
  )
  constructor(private http: HttpClient, private sharedService: SharedService) { }



  validateAuthNotTaken4Settings(control: AbstractControl) {
    return this.checkAuthNotTaken4Settings(control.value).pipe(
      map(res => {
        return res ? null : { authTaken: true };
      })
    );
  }


  checkAuthNotTaken4Settings(mws_authtoken: string) {
    return this.http.get(this.holder + "accounts/Auth_Token_4_settings/").pipe(
      map((authList: Array<any>) =>
        authList.filter(user => user.mws_authtoken === mws_authtoken)
      ),
      map(mws_authtoken => !mws_authtoken.length)
    );
  }
}