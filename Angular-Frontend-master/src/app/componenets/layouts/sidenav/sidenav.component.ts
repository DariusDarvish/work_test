import { Component, OnInit, HostListener } from '@angular/core';
import { TimerService } from 'src/services&Validtors/timer.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl, } from '@angular/forms';
import { AuthService } from 'src/services&Validtors/auth.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/services&Validtors/shared.service';

declare var $: any;
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})


export class SidenavComponent implements OnInit {
  selectedCompanies: string
  companies = []
  changeDatabseForm: FormGroup
  selectedCompany: string;
  defaultstring: null;
  Search_Toggle = false
  Advanced = false
  report_type

  holder = ''
  endpoint = this.sharedService.sharedurl_prefix.subscribe(
    dataa => { console.log(dataa); this.holder = dataa }
    , errr => { console.log("error:", errr); }
  )


  constructor(private timer: TimerService, private formBuilder: FormBuilder, private sharedService: SharedService, private httpClient: HttpClient, private authService: AuthService) { }

  ngOnInit() {
    this.sharedService.sharedreport_type.subscribe(x => this.report_type = x)
    $('[data-widget="treeview"]').Treeview('init');
    return this.httpClient.get(this.holder + 'accounts/Associated_companies/').toPromise().then((e: any[]) => {
      if (e) {
        var x;
        for (x = 0; x < e.length; x++) {
          this.companies.push(e[x])
        }
        this.changeDatabseForm = this.formBuilder.group({
          Comapny: [''],


        });

      }


    }).catch(() => {
      console.log('fail')


      return false;
    });

    this.sharedService.sharedSearch_Toggle.subscribe(Search_Toggle => this.Search_Toggle = Search_Toggle)
    this.sharedService.sharedSearch_Toggle_Advanced.subscribe(Search_Toggle => this.Advanced = Search_Toggle)
    this.show()


  }

  get f() { return this.changeDatabseForm.controls; }

  onSubmit(company1) {
    console.log(company1)
    this.authService.changingCompany({
      company: company1
    }).subscribe(success => {
      if (success) {
        console.log(success)
        alert("Pulling Data For: " + success)
        location.reload()


      } else {

        alert('Company not updated ')



      }


    });

  }


  show() {
    // this.menu = this.gridService.hide(this.menu)
    this.sharedService.nextToggle(false)
    this.sharedService.nextToggleAdvanced(false)

    // console.log(this.Search_Toggle)
  }

  create_report(params) {

    this.sharedService.nextreport_type(params)
    this.sharedService.sendClickEvent7()

  }


}
