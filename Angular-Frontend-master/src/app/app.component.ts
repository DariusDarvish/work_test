import { Component, HostListener } from '@angular/core';
import { AuthService } from 'src/services&Validtors/auth.service';
import { Router } from '@angular/router';

import { TimerService } from 'src/services&Validtors/timer.service';
import { ListdataService } from 'src/services&Validtors/listdata.service';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { SharedService } from 'src/services&Validtors/shared.service'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor(private sharedService: SharedService, private authService: AuthService, private router: Router, private timer: TimerService, private http: HttpClient, private titleService: Title) { }





  ngOnInit() {
    this.onGo()
    // this.titleService.setTitle("Amazon-Metrix");
    // if (sessionStorage.getItem('REFRESH_TOKEN')) {
    //   console.log('app component')
    // } else {
    //   this.authService.logout()
    // }



  }

  @HostListener('document:mousemove')
  @HostListener('document:keypress')
  @HostListener('document:click')
  @HostListener('document:wheel')
  onGo() {

    this.timer.resetTimer()
  }

  // @HostListener('document:keypress')
  //  @HostListener('document:click')
  // @HostListener('document:wheel')
  // refresh(){
  //   this.authService.refreshToken1()
  //   console.log('Refresh token')
  // }










}
