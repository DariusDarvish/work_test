import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from 'src/services&Validtors/auth.service';
import { User } from 'src/models/user';
import { ListdataService } from 'src/services&Validtors/listdata.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProtectcompanyService {

  companiesdistinctlist = []
  newlist = []


  constructor(private authService: AuthService, private router: Router, private dataService: ListdataService, private httpClient: HttpClient) { }



  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //need to change 
    return this.httpClient.get('http://127.0.0.1:8000/accounts/permissions/').toPromise().then((e: any[]) => {
      if (e) {
        let tmp = [];

        for (let key in e)
          if (e.hasOwnProperty(key))
            tmp = (e[key])

        //way 1
        // for (let x in tmp)
        //   console.log(tmp[x])

        //way2 so far winner 
        tmp = (Object.values(tmp))
        console.log(tmp)
        let v1 = tmp[2]
        let v2 = tmp[3]
        let v3 = tmp[4]
        let v4 = tmp[5]
        console.log(v1)
        console.log(v2)
        console.log(v3)

        if (v1 == true && v2 == false && v3 == false && v4 == false) {
          return true
        }


        if (v1 == true && v2 == true && v3 == false && v4 == false) {
          this.router.navigate(['/loadingpage'])
          return false
        }

        else {
          this.router.navigate(['/dashboard'])
          return false
        }


      }


    }).catch(() => {
      console.log('fail')

      this.router.navigate(['/login']);

      return false;
    });

  }

}
