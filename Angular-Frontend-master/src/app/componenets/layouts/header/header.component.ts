import { Component, OnInit, HostListener } from '@angular/core';
import { TitleService } from 'src/services&Validtors/title.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/services&Validtors/auth.service';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { UserIdleService } from 'angular-user-idle';
import { Idle } from 'idlejs/dist';
import { TimerService } from 'src/services&Validtors/timer.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl, } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { SharedService } from 'src/services&Validtors/shared.service';

declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  Title: string;
  companies: any;
  changeDatabseForm: FormGroup
  dropdownList = [];
  selectedItems = [];
  dropdownsettings = {};
  side_nav

  constructor(private sharedService: SharedService, private formBuilder: FormBuilder, private httpClient: HttpClient, private data: TitleService, private titleService: Title, private authService: AuthService, private router: Router, private bnIdle: BnNgIdleService, private timer: TimerService) {

  }

  ngOnInit() {
    this.sharedService.sharedside_nav_open.subscribe(x => this.side_nav = x)
    this.data.currentTitle.subscribe(Title => this.Title = Title)
    this.data.changeTitle(this.Title)
    this.changeDatabseForm = this.formBuilder.group({
      company: new FormControl(null)
    })




  }
  //going to need an emergency click event to work 
  open() {

    if (this.side_nav === false) {

      $("body").addClass('sidebar-collapse').trigger('collapsed.pushMenu');

      this.sharedService.nextside_nav_open(true)
      console.log('the value of the sidenav being closed is')
      console.log(this.side_nav)


    }
    else {
      this.sharedService.sendClickEvent3()

      $("body").removeClass('sidebar-collapse').trigger('expanded.pushMenu');
      this.sharedService.nextside_nav_open(false)



      console.log('the value of the sidenav being closed is')
      console.log(this.side_nav)


    }

  }

  relocate() {
    this.router.navigate(['/usersettings'])
  }

  get f() { return this.changeDatabseForm.controls; }

  onSubmit() {
    this.authService.changingCompany({
      company: this.f.company.value,
    }).subscribe(success => {
      if (success) {
        console.log(success)
        alert("Company updated to: " + success)
        location.reload()


      } else {

        alert('Comapny not updated ')



      }


    });

  }


  logout() {
    this.authService.logout()
    this.router.navigate(['/login']);
  };



  settingspage() {
    this.router.navigate(['/usersettings'])
  }



}
