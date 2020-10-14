import { Injectable } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { UserinfoService } from 'src/services&Validtors/userinfo.service';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SharedService } from 'src/services&Validtors/shared.service';



@Injectable()
export class AuthTokenValidator {
  holder = ''
  endpoint = this.sharedService.sharedurl_prefix.subscribe(
    dataa => { console.log(dataa); this.holder = dataa }
    , errr => { console.log("error:", errr); }
  )
  constructor(private http: HttpClient, private sharedService: SharedService) { }


  validateAuthNotTaken(control: AbstractControl) {
    return this.checkAuthNotTaken(control.value).pipe(
      map(res => {
        return res ? null : { authTaken: true };
      })
    );
  }

  checkAuthNotTaken(mws_authtoken: string) {
    return this.http.get(this.holder + "accounts/mws_authtoken/").pipe(
      map((authList: Array<any>) =>
        authList.filter(user => user.mws_authtoken === mws_authtoken)
      ),
      map(mws_authtoken => !mws_authtoken.length)
    );
  }


}