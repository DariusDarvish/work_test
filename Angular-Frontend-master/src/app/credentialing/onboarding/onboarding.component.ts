import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services&Validtors/auth.service';
import { AuthTokenValidator } from 'src/services&Validtors/authtoken';
import { MerchantValidator } from 'src/services&Validtors/merchant';
import { Advertising_Token_Validator } from 'src/services&Validtors/Advertising_Token_Validator'
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit {

  companykeyForm: FormGroup;
  constructor(private titleService: Title, private adtokenValidator: Advertising_Token_Validator, private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private authValditor: AuthTokenValidator, private merchantValditor: MerchantValidator,) { }

  ngOnInit() {
    this.titleService.setTitle("On boarding");
    this.createForm();

  }

  createForm() {
    this.companykeyForm = this.formBuilder.group({
      mws_authtoken: ['', [Validators.required, Validators.minLength(45), Validators.pattern('amzn.mws.[a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+')], this.authValditor.validateAuthNotTaken.bind(this.authValditor)],
      access_key: [''],
      merchant_id: ['', [Validators.required, Validators.pattern('^A[A-Z0-9]+')], this.merchantValditor.validateMerchantNotTaken.bind(this.merchantValditor)],
      secret_key: [''],
      marketplace_id: [''],
      advertising_token: ['', [Validators.required, Validators.minLength(20), Validators.pattern('^A[a-zA-Z0-9]+')], this.adtokenValidator.validateAdTokenNotTaken.bind(this.adtokenValidator)]

    })
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/login']);
  };

  get f() { return this.companykeyForm.controls; }

  companykeyinfo() {
    this.authService.companykeyinfo(
      {
        mws_authtoken: this.f.mws_authtoken.value,
        access_key: this.f.access_key.value,
        merchant_id: this.f.merchant_id.value,
        secret_key: this.f.secret_key.value,
        marketplace_id: this.f.marketplace_id.value,
        advertising_token: this.f.advertising_token.value,


      }

    )

      .subscribe(success => {
        if (success) {
          console.log('success')
          this.router.navigate(['/loadingpage']);
        }
      })

  }
}
