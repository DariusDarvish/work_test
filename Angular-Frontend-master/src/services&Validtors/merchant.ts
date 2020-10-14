import { Injectable } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { UserinfoService } from 'src/services&Validtors/userinfo.service';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SharedService } from 'src/services&Validtors/shared.service';


@Injectable()
export class MerchantValidator {
  holder = ''
  endpoint = this.sharedService.sharedurl_prefix.subscribe(
    dataa => { console.log(dataa); this.holder = dataa }
    , errr => { console.log("error:", errr); }
  )
  constructor(private http: HttpClient, private sharedService: SharedService) { }


  validateMerchantNotTaken(control: AbstractControl) {
    return this.checkMerchNotTaken(control.value).pipe(
      map(res => {
        return res ? null : { merchantTaken: true };
      })
    );
  }



  checkMerchNotTaken(merchant_id: string) {
    return this.http.get(this.holder + "accounts/merchant_id/").pipe(
      map((merchantList: Array<any>) =>
        merchantList.filter(user => user.merchant_id === merchant_id)
      ),
      map(merchant_id => !merchant_id.length)
    );
  }



}