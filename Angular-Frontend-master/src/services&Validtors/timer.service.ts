import { Injectable } from '@angular/core';
import { AuthService } from 'src/services&Validtors/auth.service';
import { Router } from '@angular/router';
import { Component, HostListener } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TimerService {
  time: any;
  constructor(private authService: AuthService, private router: Router) { }



  @HostListener('document:mousemove')
  @HostListener('document:keypress')
  @HostListener('document:click')
  @HostListener('document:wheel')
  resetTimer() {

    clearTimeout(this.time);
    this.time = setTimeout(() => {
      if (document.URL.includes("login") || document.URL.includes("landing")) {

      }
      else {
        this.authService.logout();
        this.router.navigate(['/login'])
        alert('Idle for  20 mintues. ');
      }


    }, 960000);




  }


  @HostListener('document:mousemove')
  @HostListener('document:keypress')
  @HostListener('document:click')
  @HostListener('document:wheel')
  refresh() {
    this.authService.refreshToken()
    console.log('Refresh')
  }

}
