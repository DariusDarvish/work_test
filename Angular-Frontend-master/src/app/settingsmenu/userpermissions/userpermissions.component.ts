import { Component, OnInit } from '@angular/core';

import { ListdataService } from 'src/services&Validtors/listdata.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { UsernameValidator } from 'src/services&Validtors/username';
import { AuthService } from 'src/services&Validtors/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { SharedService } from 'src/services&Validtors/shared.service';


@Component({
  selector: 'app-userpermissions',
  templateUrl: './userpermissions.component.html',
  styleUrls: ['./userpermissions.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class UserpermissionsComponent implements OnInit {
  users: any
  isShow = false;
  inviteUserForm: FormGroup;
  username: string;
  company: string;
  submit_user_form: FormGroup;
  usertype: string;
  changeusertypeform: FormGroup;
  deleteuserform: FormGroup;
  username_2_delete: string;

  constructor(private sharedService: SharedService, private titleService: Title, config: NgbModalConfig, private modalService: NgbModal, private dataService: ListdataService, private httpClient: HttpClient, private formBuilder: FormBuilder, private usernameValditor: UsernameValidator, private authService: AuthService, public dialog: MatDialog) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.titleService.setTitle("Users permissons");
    var holder
    var endpoint = this.sharedService.sharedurl_prefix.subscribe(
      dataa => { console.log(dataa); holder = dataa }
      , errr => { console.log("error:", errr); }
    )
    var report = 'accounts/All_User_Info/'
    var final = holder.concat(report.toString())
    return this.httpClient.get(final).toPromise().then((e: any[]) => {
      if (e) {

        console.log(e)
        this.users = e
        console.log(this.users)
        this.submit_user_form = this.formBuilder.group({
          username: ['']
        })
        this.changeusertypeform = this.formBuilder.group({
          user_type: ['', Validators.required],
          password: ['', Validators.required],
          username: ['']
        })

        this.deleteuserform = this.formBuilder.group({
          username: [''],
          password: ['']

        })

      }
    }).catch(() => {
      console.log('fail')
      return false;
    });
  }


  onSelect(user) {
    alert("Username: " + user.username + "    " + "Email: " + user.email + "\n" +
      "First name: " + user.first_name + "    " + "Last name: " + user.last_name + "\n" +
      "Last Login: " + user.last_login + "\n" + "date_joined: " + user.date_joined + "\n")
  }


  get_type(user, content) {
    console.log(user)
    this.authService.getusertypes({
      username: user
    }).subscribe(success => {
      if (success) {
        console.log(success)
        this.usertype = success[0]['user_type']
        this.open(content)

      }


    });
  }

  get_type2(user, content) {
    console.log(user)
    this.authService.getusertypes({
      username: user
    }).subscribe(success => {
      if (success) {
        console.log(success)
        this.usertype = success[0]['user_type']
        this.open2(content)

      }


    });
  }


  toggleDisplay() {
    this.isShow = !this.isShow;
    return this.httpClient.get('/api/accounts/user_info_for_email').toPromise().then((e: any[]) => {
      if (e) {
        console.log(e)
        this.username = (e[0]['username'])
        this.company = (e[0]['company']

        )

        this.inviteUserForm = this.formBuilder.group({
          company: [this.company],
          username: [this.username],
          email: ['', Validators.required],
          user_type: ['', Validators.required]
        })




      }


    }).catch(() => {
      console.log('fail')


      return false;
    });

  }

  open(content) {
    this.modalService.open(content);
  }

  open2(content1) {
    this.modalService.open(content1)
  }

  get f() { return this.inviteUserForm.controls; }
  get g() { return this.changeusertypeform.controls; }
  get h() { return this.deleteuserform.controls; }

  delete_user(user, content) {
    var holder
    var endpoint = this.sharedService.sharedurl_prefix.subscribe(
      dataa => { console.log(dataa); holder = dataa }
      , errr => { console.log("error:", errr); }
    )
    var report = 'accounts/user_info_for_email/'
    var final = holder.concat(report.toString())
    this.get_type2(user, content)
    this.httpClient.get(final).toPromise().then((e: any[]) => {
      if (e) {
        console.log(e)
        this.username = (e[0]['username'])
        this.company = (e[0]['company'])
        console.log(this.username)
        this.username_2_delete = user
        console.log(this.username_2_delete)

      }
    }).catch(() => {
      console.log('fail')
      return false;
    });
  }

  delete_user_submit() {
    console.log(this.username_2_delete)
    this.authService.deleteuser({
      username: this.username_2_delete,
      password: this.h.password.value
    }).subscribe(success => {
      if (success) {
        alert(success)
      }


    });
  }

  changeType(user) {
    var username = user.username + "";
    console.log(username)
    this.authService.changeusertype({
      username: username,
      user_type: this.g.user_type.value,
      password: this.g.password.value
    }).subscribe(success => {
      if (success) {
        alert(success)
      }


    });
  }

  changeData() {
    this.authService.sendEmailInvite({
      company: this.f.company.value,
      username: this.f.username.value,
      email: this.f.email.value,
      user_type: this.f.user_type.value
    }).subscribe(success => {
      if (success) {
        alert('Invite was sent')
      }


    });
  }


}


