import { Injectable } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { UserinfoService } from 'src/services&Validtors/userinfo.service';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SharedService } from 'src/services&Validtors/shared.service';


@Injectable()
export class Advertising_Token_Validator_4_Settings {
  holder = ''
  endpoint = this.sharedService.sharedurl_prefix.subscribe(
    dataa => { console.log(dataa); this.holder = dataa }
    , errr => { console.log("error:", errr); }
  )
  constructor(private http: HttpClient, private sharedService: SharedService) { }


  validateCompanyNotTaken4Settings(control: AbstractControl) {
    return this.checkAdTokenNotTaken4Settings(control.value).pipe(
      map(res => {
        return res ? null : { TokenTaken: true };
      })
    );
  }


  checkAdTokenNotTaken4Settings(advertising_token: string) {
    return this.http.get(this.holder + "accounts/Advertising_Token_4_settings/").pipe(
      map((advertising_tokenList: Array<any>) =>
        advertising_tokenList.filter(user => user.advertising_token === advertising_token)
      ),
      map(advertising_token => !advertising_token.length)
    );
  }


}