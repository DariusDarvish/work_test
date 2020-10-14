import { Injectable } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { UserinfoService } from 'src/services&Validtors/userinfo.service';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable()
export class Advertising_Token_Validator {
  constructor(private http: HttpClient) { }



  validateAdTokenNotTaken(control: AbstractControl) {
    return this.checkAdTokenNotTaken(control.value).pipe(
      map(res => {
        return res ? null : { TokenTaken: true };
      })
    );
  }




  checkAdTokenNotTaken(advertising_token: string) {
    return this.http.get("http://127.0.0.1:8000/accounts/Advertising_Token/").pipe(
      map((advertising_tokenList: Array<any>) =>
        advertising_tokenList.filter(user => user.advertising_token === advertising_token)
      ),
      map(advertising_token => !advertising_token.length)
    );
  }

}