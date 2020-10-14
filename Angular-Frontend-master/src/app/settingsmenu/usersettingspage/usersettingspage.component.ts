import { Component, OnInit } from '@angular/core';
import { ListdataService } from 'src/services&Validtors/listdata.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { PersonalValidator } from 'src/services&Validtors/username&email';
import { AuthService } from 'src/services&Validtors/auth.service'
import { map, filter, switchMap } from 'rxjs/operators';
import { EmaillistService } from 'src/services&Validtors/emaillist.service'
import { Email4SettingsValidator } from 'src/services&Validtors/settingsemail'
import { User4SettingsValidator } from 'src/services&Validtors/settingsuser'
import { CustomValidtaionPasswordService } from 'src/services&Validtors/custom-validtaion-password.service'
import { Title } from '@angular/platform-browser';
import { SharedService } from 'src/services&Validtors/shared.service';

@Component({
  selector: 'app-usersettingspage',
  templateUrl: './usersettingspage.component.html',
  styleUrls: ['./usersettingspage.component.scss']
})
export class UsersettingspageComponent implements OnInit {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  changedataForm: FormGroup;
  changePasswordForm: FormGroup;

  constructor(private sharedService: SharedService, private titleService: Title, private passwordValditor: CustomValidtaionPasswordService, private emailService: EmaillistService, private dataService: ListdataService, private httpClient: HttpClient, private formBuilder: FormBuilder, private usernameValditor: User4SettingsValidator, private emailValditor: Email4SettingsValidator, private personalValditor: PersonalValidator, private auth: AuthService) { }

  ngOnInit() {
    this.titleService.setTitle("User setttings");
    var holder
    var endpoint = this.sharedService.sharedurl_prefix.subscribe(
      dataa => { console.log(dataa); holder = dataa }
      , errr => { console.log("error:", errr); }
    )
    var report = 'accounts/user_info/'
    var final = holder.concat(report.toString())
    //need to change 
    return this.httpClient.get(final).toPromise().then((e: any[]) => {
      if (e) {
        this.username = (e[0]['username'])
        this.first_name = (e[0]['first_name'])
        this.last_name = (e[0]['last_name'])
        this.email = (e[0]['email'])

        console.log(this.username)
        console.log(this.first_name)
        console.log(this.last_name)
        console.log(this.email)

        this.changedataForm = this.formBuilder.group({
          username: [this.username, Validators.required, [this.usernameValditor.validateUsernameNotTaken.bind(this.usernameValditor),]],
          first_name: [this.first_name],
          last_name: [this.last_name],
          email: [this.email, [Validators.required, Validators.email], [this.emailValditor.validateEmailNotTaken.bind(this.emailValditor)]]

        });
        this.changePasswordForm = this.formBuilder.group({
          old_password: [''],
          new_password1: ['', [Validators.minLength(8)],],
          new_password2: ['', Validators.required,]

        }, { validator: this.passwordValditor.passwordMatchValidator("new_password1", "new_password2") });


      }


    }).catch(() => {
      console.log('fail')


      return false;
    });



  }
  get f() { return this.changedataForm.controls; }
  get g() { return this.changePasswordForm.controls; }

  ChangePassword() {
    this.auth.changepasswordwhenloggedin({
      old_password: this.g.old_password.value,
      new_password1: this.g.new_password1.value,
      new_password2: this.g.new_password2.value


    }).subscribe(success => {
      if (success) {
        console.log(success)
        alert("Password has been updated")

      }


    })
  }





  changeData() {
    this.auth.changedatawhenloggedin({
      username: this.f.username.value,
      email: this.f.email.value,
      first_name: this.f.first_name.value,
      last_name: this.f.last_name.value

    }).subscribe(success => {
      if (success) {
        alert("Info has been updated")



      } else {

        alert('error')

        event.stopPropagation();

      }


    });
  }






}
