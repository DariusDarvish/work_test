import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {
  username_url = 'http://127.0.0.1:8000/accounts/UserData/';

  companies_url = 'http://127.0.0.1:8000/accounts/distinct_companies/'

  constructor(private http: HttpClient) { }

  getUserByUserName(username: string) {
    return this.http.get<any[]>(`${this.username_url}`);
    // return this.http.get<any[]>(this.url,{params: new HttpParams().set('username',username)})
  }
  getCompanyName(company: string) {
    return this.http.get<any[]>(`${this.companies_url}`);
  }


}
