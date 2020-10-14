import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Form, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services&Validtors/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UniqueUsernameValidtorDirective } from 'src/services&Validtors/unique-username-validtor.directive';
import { UserinfoService } from 'src/services&Validtors/userinfo.service';
import { UniqueUsernameValidtor } from 'src/services&Validtors/unique-username-validtor.directive';
import { UsernameValidator } from 'src/services&Validtors/username';
import { CustomValidtaionPasswordService } from 'src/services&Validtors/custom-validtaion-password.service'
import { EmailValidator } from 'src/services&Validtors/uniqueemail'
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-create-user-from-email',
  templateUrl: './create-user-from-email.component.html',
  styleUrls: ['./create-user-from-email.component.scss']
})
export class CreateUserFromEmailComponent implements OnInit {
  company_name: string;
  token: string;
  signupForm: FormGroup
  constructor(private titleService: Title, private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private usernameValditor: UsernameValidator, private passwordValditor: CustomValidtaionPasswordService, private emailValditor: EmailValidator) { }

  ngOnInit() {
    this.titleService.setTitle("Sign up");
    this.route.queryParams.subscribe(params => {
      this.company_name = params['company'];
      console.log(this.company_name);
      this.token = params['token'];
      console.log(this.token)
    });

    this.signupForm = this.formBuilder.group({
      token: [this.token],
      company_name: [this.company_name],
      //need valdiator
      email: ['', [Validators.required, Validators.email], this.emailValditor.validateEmailNotTaken.bind(this.emailValditor)],
      //need valdiator
      username: ['', Validators.required, this.usernameValditor.validateUsernameNotTaken.bind(this.usernameValditor)],
      first_name: ['', Validators.required,],
      last_name: ['', Validators.required,],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', Validators.required,]

    }, { validator: this.passwordValditor.passwordMatchValidator("password", "password2") })

  }

  get f() { return this.signupForm.controls; }

  signup() {
    this.authService.creatingUser2Company({
      token: this.f.token.value,
      company_name: this.f.company_name.value,
      email: this.f.email.value,
      username: this.f.username.value,
      first_name: this.f.first_name.value,
      last_name: this.f.last_name.value,
      password: this.f.password.value,
      password2: this.f.password2.value

    }).subscribe(success => {
      console.log(success)
      alert('successfully created a user')
      this.router.navigate(['login/'])

    });
  }

}
