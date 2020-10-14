import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Form, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services&Validtors/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-add-created-user-to-company',
  templateUrl: './add-created-user-to-company.component.html',
  styleUrls: ['./add-created-user-to-company.component.scss']
})
export class AddCreatedUserToCompanyComponent implements OnInit {
  company_name: string;
  token: string;
  addUserForm: FormGroup
  constructor(private titleService: Title, private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.titleService.setTitle("Add user");
    this.route.queryParams.subscribe(params => {
      this.company_name = params['company'];
      console.log(this.company_name);
      this.token = params['token'];
      console.log(this.token)
    });
    this.addUserForm = this.formBuilder.group({
      token: [this.token]
    })

  }
  get f() { return this.addUserForm.controls; }

  addUser() {
    this.authService.addingUser2Company({
      token: this.f.token.value
    }).subscribe(success => {
      console.log(success)
      if (success == 'Already part of the company') {
        alert('you are already part of ' + this.company_name)
        this.router.navigate(['login/'])

      } else {

        alert('You have succesffuly joined ' + this.company_name)
        this.router.navigate(['login/'])
      }

    });
  }


}
