import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Form, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services&Validtors/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  resetForm: FormGroup;
  public uid: string;
  public token: string;

  constructor(private titleService: Title, private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.titleService.setTitle("Reset password");
    this.route.queryParams.subscribe(params => {
      this.uid = params['uid'];
      console.log(this.uid);
      this.token = params['token'];
      console.log(this.token)
    });

    this.resetForm = this.formBuilder.group({
      new_password: ['', [Validators.required, Validators.minLength(8)],],
      uid: [''],
      token: ['']
    });
  }

  get f() { return this.resetForm.controls; }

  reset() {
    this.authService.resetpasswordendpoint(
      {
        new_password: this.f.new_password.value,
        uid: this.uid,
        token: this.token

      }
    )
      .subscribe(success => {
        alert('Password reset')
        this.router.navigate(['/login']);

      });
  }

}
