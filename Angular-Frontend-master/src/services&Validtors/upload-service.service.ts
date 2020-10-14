import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/services&Validtors/shared.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  holder = ''
  endpoint = this.sharedService.sharedurl_prefix.subscribe(
    dataa => { console.log(dataa); this.holder = dataa }
    , errr => { console.log("error:", errr); }
  )

  DJANGO_SERVER: string = "http://127.0.0.1:8000";
  constructor(private http: HttpClient, private sharedService: SharedService) { }


  inputs: { username: string, password: string }

  public upload(formData) {

    return this.http.post<any>(`${this.holder}reports/productdata_upload/`, formData);
  }
}
