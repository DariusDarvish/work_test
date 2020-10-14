import { Injectable } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { UserinfoService } from 'src/services&Validtors/userinfo.service';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SharedService } from 'src/services&Validtors/shared.service';


@Injectable()
export class MerchantValidator4Settings {
  holder = ''
  endpoint = this.sharedService.sharedurl_prefix.subscribe(
    dataa => { console.log(dataa); this.holder = dataa }
    , errr => { console.log("error:", errr); }
  )
  constructor(private http: HttpClient, private sharedService: SharedService) { }


  validateMerchantNotTaken4Settings(control: AbstractControl) {
    return this.checkMerchNotTaken4settings(control.value).pipe(
      map(res => {
        return res ? null : { merchantTaken: true };
      })
    );
  }


  checkMerchNotTaken4settings(merchant_id: string) {
    return this.http.get(this.holder + "accounts/Merchant_id_4_settings/").pipe(
      map((merchantList: Array<any>) =>
        merchantList.filter(user => user.merchant_id === merchant_id)
      ),
      map(merchant_id => !merchant_id.length)
    );
  }




}