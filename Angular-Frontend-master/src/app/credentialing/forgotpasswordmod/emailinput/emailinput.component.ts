import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services&Validtors/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-emailinput',
  templateUrl: './emailinput.component.html',
  styleUrls: ['./emailinput.component.scss']
})
export class EmailinputComponent implements OnInit {

  emailForm: FormGroup;

  constructor(private titleService: Title, private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.titleService.setTitle("Reset password");
    this.emailForm = this.formBuilder.group({
      email: [''],

    });
  }

  get f() { return this.emailForm.controls; }


  emailverfication() {
    this.authService.emailpasswordsendlink(
      {
        email: this.f.email.value

      }
    )
      .subscribe(success => {

        alert("Check your email")


      });
  }

}
