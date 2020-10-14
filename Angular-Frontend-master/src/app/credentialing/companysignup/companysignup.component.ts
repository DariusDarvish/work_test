
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services&Validtors/auth.service';
import { ListdataService } from 'src/services&Validtors/listdata.service';
import { HttpClient } from '@angular/common/http';
import { CompanyValidator } from 'src/services&Validtors/company';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-companysignup',
  templateUrl: './companysignup.component.html',
  styleUrls: ['./companysignup.component.scss']
})
export class CompanysignupComponent implements OnInit {
  compsignupForm: FormGroup;
  companydistinctlist = []
  newlist = []
  constructor(private titleService: Title, private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private dataService: ListdataService, private httpClient: HttpClient, private companyvalidator: CompanyValidator) { }



  ngOnInit() {
    this.titleService.setTitle("Company register");
    this.compsignupForm = this.formBuilder.group({
      company_name: ['', Validators.required, this.companyvalidator.validateCompanyNotTaken.bind(this.companyvalidator)],
      profile_name: [''],
      project_name: [''],
    });






    this.dataService.sendGetRequestdistinctcompanies().subscribe((data: any[]) => {
      let tmp = [];

      for (let key in data)
        if (data.hasOwnProperty(key))
          tmp.push(data[key])


      this.companydistinctlist = tmp
      console.log(this.companydistinctlist)
      var arrayLength = this.companydistinctlist.length;
      for (var i = 0; i < arrayLength; i++) {
        this.newlist.push(this.companydistinctlist[i].company);
        //Do something
      }
      console.log(this.newlist)

    })

    // this.canActivate()



  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/login']);
  };

  get f() { return this.compsignupForm.controls; }

  companysignup() {
    this.authService.companyregister(
      {
        company_name: this.f.company_name.value,
        profile_name: this.f.profile_name.value,
        project_name: this.f.project_name.value

      }

    )
      .subscribe(success => {
        if (this.newlist.indexOf(success.company) == -1) {
          console.log(success.company)

          console.log('here')


          this.router.navigate(['/onboarding'])


        } else {

          alert('Company alaready exisits')

          event.stopPropagation();

        }


      });
  }







}



