import { Injectable } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { UserinfoService } from 'src/services&Validtors/userinfo.service';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SharedService } from 'src/services&Validtors/shared.service';


@Injectable()
export class CompanyValidator4Settings {
  holder = ''
  endpoint = this.sharedService.sharedurl_prefix.subscribe(
    dataa => { console.log(dataa); this.holder = dataa }
    , errr => { console.log("error:", errr); }
  )
  constructor(private http: HttpClient, private sharedService: SharedService) { }




  validateCompanyNotTaken4Settings(control: AbstractControl) {
    return this.checkCompanyNotTaken4Settings(control.value).pipe(
      map(res => {
        return res ? null : { profile_nameTaken: true };
      })
    );
  }


  checkCompanyNotTaken4Settings(profile_name: string) {
    return this.http.get(this.holder + "accounts/Profile_name_4_settings/").pipe(
      map((profile_nameList: Array<any>) =>
        profile_nameList.filter(user => user.profile_name === profile_name)
      ),
      map(profile_name => !profile_name.length)
    );
  }


}