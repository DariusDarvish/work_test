import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'src/app/credintaling/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule, } from '@angular/material/button';
import { MatFormFieldModule, } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthGuard } from 'src/app/guards/authguard.service';
import { AuthService } from 'src/services&Validtors/auth.service';

import { TokenInterceptor } from 'src/services&Validtors/token.interceptor.service';

@NgModule({
  declarations: [LoginComponent],
  providers: [
    AuthGuard,
    AuthService,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class AuthModule { }