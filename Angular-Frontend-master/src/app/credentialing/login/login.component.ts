import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services&Validtors/auth.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle("Login");
    // console.log('session storgae')
    // console.log(sessionStorage.getItem('JWT_TOKEN'))
    // console.log(sessionStorage.getItem('REFRESH_TOKEN'))
    // console.log('local storgae')
    // console.log(localStorage.getItem('JWT_TOKEN'))
    // console.log(localStorage.getItem('REFRESH_TOKEN'))

    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  get f() { return this.loginForm.controls; }

  login() {
    this.authService.login(
      {
        username: this.f.username.value,
        password: this.f.password.value
      }
    )
      .subscribe(success => {
        if (success) {
          this.router.navigate(['/dashboard']);
        }
      });
  }

}
