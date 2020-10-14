import { Injectable } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { UserinfoService } from 'src/services&Validtors/userinfo.service';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SharedService } from 'src/services&Validtors/shared.service';


@Injectable()
export class CompanyValidator {
  holder = ''
  endpoint = this.sharedService.sharedurl_prefix.subscribe(
    dataa => { console.log(dataa); this.holder = dataa }
    , errr => { console.log("error:", errr); }
  )
  constructor(private http: HttpClient, private sharedService: SharedService) { }


  validateCompanyNotTaken(control: AbstractControl) {
    return this.checkCompanyNotTaken(control.value).pipe(
      map(res => {
        return res ? null : { companyTaken: true };
      })
    );
  }



  checkCompanyNotTaken(company: string) {
    return this.http.get(this.holder + "accounts/distinct_companies/").pipe(
      map((companyList: Array<any>) =>
        companyList.filter(user => user.company === company)
      ),
      map(company => !company.length)
    );
  }




}