import { Component, OnInit } from '@angular/core';
import { ListdataService } from 'src/services&Validtors/listdata.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsernameValidator } from 'src/services&Validtors/username';
import { AuthService } from 'src/services&Validtors/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthTokenValidator } from 'src/services&Validtors/authtoken';
import { MerchantValidator } from 'src/services&Validtors/merchant';
import { CompanyValidator } from 'src/services&Validtors/company'
import { Advertising_Token_Validator } from 'src/services&Validtors/Advertising_Token_Validator'
import { CompanyValidator4Settings } from 'src/services&Validtors/company4settings'
import { AuthTokenValidator4Settings } from 'src/services&Validtors/mws_authtoken_4_settings'
import { MerchantValidator4Settings } from 'src/services&Validtors/merchant_4_settings'
import { Advertising_Token_Validator_4_Settings } from 'src/services&Validtors/Advertising_Token_Validator_4_serrings'
import { Title } from '@angular/platform-browser';
import { SharedService } from 'src/services&Validtors/shared.service';


@Component({
  selector: 'app-passwordresetpage',
  templateUrl: './passwordresetpage.component.html',
  styleUrls: ['./passwordresetpage.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class PasswordresetpageComponent implements OnInit {

  Account_name: string;
  Mws_Authtoken: string;
  Merchant_ID: string;
  Advertising_Token: string;
  isShow = false;
  changeDataForm: FormGroup;
  usertype: any;

  constructor(private sharedService: SharedService, private titleService: Title, private adtokenValidator: Advertising_Token_Validator_4_Settings, private authTokenValidator: AuthTokenValidator4Settings, private merchantValidator: MerchantValidator4Settings, private companyValidator: CompanyValidator4Settings, config: NgbModalConfig, private modalService: NgbModal, private dataService: ListdataService, private httpClient: HttpClient, private formBuilder: FormBuilder, private usernameValditor: UsernameValidator, private auth: AuthService, public dialog: MatDialog) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.titleService.setTitle("Account info");
    var holder
    var endpoint = this.sharedService.sharedurl_prefix.subscribe(
      dataa => { console.log(dataa); holder = dataa }
      , errr => { console.log("error:", errr); }
    )
    var report = 'accounts/account_info/'
    var final = holder.concat(report.toString())


    return this.httpClient.get(final).toPromise().then((e: any[]) => {
      if (e) {
        this.hidebutton()
        this.Account_name = (e[0]['profile_name'])
        this.Mws_Authtoken = (e[0]['mws_authtoken'])
        this.Merchant_ID = (e[0]['merchant_id'])
        this.Advertising_Token = (e[0]['advertising_token'])


        this.changeDataForm = this.formBuilder.group({
          password: ['', Validators.required,],
          profile_name: [this.Account_name, Validators.required, [this.companyValidator.validateCompanyNotTaken4Settings.bind(this.companyValidator),]],
          mws_authtoken: [this.Mws_Authtoken, Validators.required, [this.authTokenValidator.validateAuthNotTaken4Settings.bind(this.authTokenValidator)]],
          merchant_id: [this.Merchant_ID, Validators.required, [this.merchantValidator.validateMerchantNotTaken4Settings.bind(this.merchantValidator)]],
          advertising_token: [this.Advertising_Token, Validators.required, [this.adtokenValidator.validateCompanyNotTaken4Settings.bind(this.adtokenValidator)]]


        });
      }


    }).catch(() => {
      console.log('fail')


      return false;
    });




  }

  hidebutton() {
    var holder
    var endpoint = this.sharedService.sharedurl_prefix.subscribe(
      dataa => { console.log(dataa); holder = dataa }
      , errr => { console.log("error:", errr); }
    )
    var report = 'accounts/Get_User_Type_4_Settings/'
    var final = holder.concat(report.toString())


    this.httpClient.get(final).toPromise().then((e: any[]) => {
      if (e) {
        this.usertype = e
      }


    }).catch(() => {
      console.log('fail')


      return false;
    });




  }



  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  get f() { return this.changeDataForm.controls; }

  open(content) {
    this.modalService.open(content);
  }

  ChangeData() {


    this.auth.changeinfo({
      password: this.f.password.value,
      profile_name: this.f.profile_name.value,
      mws_authtoken: this.f.mws_authtoken.value,
      merchant_id: this.f.merchant_id.value,
      advertising_token: this.f.advertising_token.value


    }).subscribe(success => {
      if (success) {
        this.isShow = !this.isShow

      }


    });
  }


}


