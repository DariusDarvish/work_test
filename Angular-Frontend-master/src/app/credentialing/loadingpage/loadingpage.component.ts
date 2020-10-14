import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services&Validtors/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-loadingpage',
  templateUrl: './loadingpage.component.html',
  styleUrls: ['./loadingpage.component.scss']
})
export class LoadingpageComponent implements OnInit {

  constructor(private titleService: Title, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.titleService.setTitle("loading page");
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/login']);
  };
}
