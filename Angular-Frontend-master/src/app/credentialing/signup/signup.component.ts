import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services&Validtors/auth.service';
import { UniqueUsernameValidtorDirective } from 'src/services&Validtors/unique-username-validtor.directive';
import { UserinfoService } from 'src/services&Validtors/userinfo.service';
import { UniqueUsernameValidtor } from 'src/services&Validtors/unique-username-validtor.directive';
import { UsernameValidator } from 'src/services&Validtors/username';
import { CustomValidtaionPasswordService } from 'src/services&Validtors/custom-validtaion-password.service'
import { EmailValidator } from 'src/services&Validtors/uniqueemail'
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  // username:string;
  // password:string;
  // password2:string;
  // email:string;

  constructor(private titleService: Title, private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private usernameValditor: UsernameValidator, private passwordValditor: CustomValidtaionPasswordService, private emailValditor: EmailValidator) { }

  ngOnInit() {
    this.titleService.setTitle("Sign in");
    this.createForm();
  }

  createForm() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required, this.usernameValditor.validateUsernameNotTaken.bind(this.usernameValditor)],
      password: ['', [Validators.required, Validators.minLength(8)],],
      password2: [''],
      email: ['', [Validators.required, Validators.email], this.emailValditor.validateEmailNotTaken.bind(this.emailValditor)]

    }, { validator: this.passwordValditor.passwordMatchValidator("password", "password2") })
  }

  get f() { return this.signupForm.controls; }

  signup() {
    this.authService.signup(
      {
        username: this.f.username.value,
        password: this.f.password.value,
        password2: this.f.password2.value,
        email: this.f.email.value,
      }

    )

      .subscribe(success => {
        if (success) {
          console.log('success')
          // this.router.navigate(['/companysignup']);
        }
      });

    setTimeout(() => {
      this.authService.login(
        {
          username: this.f.username.value,
          password: this.f.password.value
        }
      )
        .subscribe(success => {
          if (success) {
            this.router.navigate(['/companysignup']);
          }
        });
    }, 1200);
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/login']);
  };



}
