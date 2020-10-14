import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, Observable, Subject, throwError } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';

import { Tokens } from 'src/services&Validtors/tokens';
import { User } from 'src/models/user';
import { Router } from '@angular/router';
import { SharedService } from 'src/services&Validtors/shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;
  private string: "application/json";
  holder = ''
  endpoint = this.sharedService.sharedurl_prefix.subscribe(
    dataa => { console.log(dataa); this.holder = dataa }
    , errr => { console.log("error:", errr); }
  )


  constructor(private http: HttpClient, private route: Router, private sharedService: SharedService) { }

  styledetailsmassupload(inputs: { data: any }) {
    console.log('executing')
    return this.http.post('http://127.0.0.1:8000/reports/productdata_upload/', inputs)
  }

  styledetailsupload(inputs: { data: any }) {
    return this.http.post(this.holder + 'reports/productdataupload/', inputs)
  }

  deleteuser(inputs: { username: string, password: string }) {
    return this.http.post(this.holder + 'accounts/Delete_User/', inputs)
  }

  changeusertype(inputs: { user_type: string, username: string, password: String }) {
    return this.http.post(this.holder + 'accounts/Change_User_Types/', inputs)
  }

  getusertypes(inputs: { username: string }) {
    return this.http.post(this.holder + 'accounts/Get_User_Types/', inputs)
  }

  changingCompany(inputs: { company: string }) {
    return this.http.post(this.holder + 'accounts/Get_database/', inputs)
  }

  creatingUser2Company(inputs: { email: string, company_name: string, username: string, password: String, password2: string, first_name: string, last_name: string, token: string }) {
    return this.http.post(this.holder + 'accounts/CreateNewUser/', inputs)
  }

  addingUser2Company(inputs: { token: string }) {
    return this.http.post(this.holder + 'accounts/Adding_user_through_invite/', inputs)
  }

  sendEmailInvite(inputs: { company: string, user_type: string, email: string, username }) {
    return this.http.post(this.holder + 'accounts/send_email/', inputs)
  }

  erroHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server Error');
  }

  changeinfo(inputs: { password: string, profile_name: string, mws_authtoken: string, merchant_id: string, advertising_token: string }) {
    return this.http.post(this.holder + 'accounts/account_info/', inputs).pipe(catchError(this.erroHandler))
  }

  checkcurrentemail() {
    return this.http.get(this.holder + 'accounts/user_data_4_validator/')
  }



  resetpasswordendpoint(user: { new_password: string, uid: string, token: string }) {
    return this.http.post<any>(this.holder + 'accounts/auth/users/reset_password_confirm/', user)
  }

  emailpasswordsendlink(user: { email: string }) {
    return this.http.post<any>(this.holder + 'accounts/auth/users/reset_password/', user)
  }

  changepasswordwhenloggedin(user: { old_password: string, new_password1: string, new_password2: string }) {
    return this.http.post<any>(this.holder + 'rest-auth/password/change/', user)
  }

  changedatawhenloggedin(user: { username: string, email: string, first_name: string, last_name: string }) {
    return this.http.post<any>(this.holder + 'accounts/user_info/', user)
  }

  companyregister(user: { profile_name: string, project_name: string, company_name: string }) {
    return this.http.post<any>(this.holder + 'accounts/company/', user)
  }

  companykeyinfo(user: { mws_authtoken: string, access_key: string, merchant_id: string, secret_key: string, marketplace_id: string, advertising_token: string }) {
    return this.http.post<any>(this.holder + 'accounts/onboarding/', user)
  }



  signup(user: { username: string, password: string, password2: string, email: string, }) {
    return this.http.post<any>(this.holder + 'accounts/register/', user)

  }


  login(user: { username: string, password: string }): Observable<boolean> {

    return this.http.post<any>(this.holder + 'api-token-auth/', user)
      .pipe(
        tap(tokens => this.doLoginUser(user.username, tokens)),
        mapTo(true),
        catchError(error => {
          alert('Incorrect username or password');
          return of(false);
        }))        // call the email service to rmeove our email
    // call the email service to rmeove our email
  }


  logout() {
    this.removeTokens()
    return this.http.post<any>('http://127.0.0.1:8000/api-token-auth/', {
      'refresh': this.getRefreshToken(),

    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));

  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }


  refreshToken() {
    console.log(sessionStorage.getItem('REFRESH_TOKEN'))
    return this.http.post(this.holder + 'api-token-refresh/', {
      'refresh': sessionStorage.getItem('REFRESH_TOKEN')
    }).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.access);
      console.log(tokens)
    }));
  }

  getJwtToken() {

    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(username: string, tokens: Tokens) {
    this.loggedUser = username;
    this.storeTokens(tokens);


  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.access);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh);
    sessionStorage.setItem(this.REFRESH_TOKEN, tokens.refresh)
    sessionStorage.setItem(this.JWT_TOKEN, tokens.access)
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    sessionStorage.removeItem(this.REFRESH_TOKEN);
  }


}
