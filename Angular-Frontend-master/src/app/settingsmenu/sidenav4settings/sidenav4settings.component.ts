import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TimerService } from 'src/services&Validtors/timer.service';
import { SharedService } from 'src/services&Validtors/shared.service';

@Component({
  selector: 'app-sidenav4settings',
  templateUrl: './sidenav4settings.component.html',
  styleUrls: ['./sidenav4settings.component.scss']
})
export class Sidenav4settingsComponent implements OnInit {
  usertype: any;
  constructor(private router: Router, private httpClient: HttpClient, private timer: TimerService, private sharedService: SharedService) { }

  ngOnInit() {

    var holder
    var endpoint = this.sharedService.sharedurl_prefix.subscribe(
      dataa => { console.log(dataa); holder = dataa }
      , errr => { console.log("error:", errr); }
    )
    var report = 'accounts/Get_User_Type_4_Settings/'
    var final = holder.concat(report.toString())
    return this.httpClient.get(final).toPromise().then((e: any[]) => {
      if (e) {


        this.usertype = e
        console.log(this.usertype)

      }
    }).catch(() => {
      console.log('fail')
      return false;
    });
  }

  userinfopage() {
    this.router.navigate(['/usersettings'])
  }


  @HostListener('document:mousemove')
  @HostListener('document:keypress')
  @HostListener('document:click')
  @HostListener('document:wheel')
  onGo() {

    this.timer.resetTimer()
  }



}
