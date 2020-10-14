import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from 'src/services&Validtors/auth.service';
import { User } from 'src/models/user';
import { ListdataService } from 'src/services&Validtors/listdata.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SettingsPermissionGuardService {
  user_type = "user"

  constructor(private authService: AuthService, private router: Router, private dataService: ListdataService, private httpClient: HttpClient) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //need to change 
    return this.httpClient.get('http://127.0.0.1:8000/accounts/Get_User_Type_4_Settings/').toPromise().then((e: any) => {
      if (e) {
        let tmp = e


        //way 1
        // for (let x in tmp)
        //   console.log(tmp[x])

        //way2 so far winner 

        console.log('guard here')
        console.log(tmp)
        console.log('guard here')

        if (tmp == this.user_type) {
          this.router.navigate(['/usersettings'])
          return false
        } else {
          return true
        }

      }


    }).catch(() => {
      console.log('fail')

      this.router.navigate(['/login']);

      return false;
    });

  }
}