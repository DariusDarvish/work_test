import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/services&Validtors/shared.service';

@Injectable({
  providedIn: 'root'
})
export class ListdataService {



  holder = ''
  endpoint = this.sharedService.sharedurl_prefix.subscribe(
    dataa => { console.log(dataa); this.holder = dataa }
    , errr => { console.log("error:", errr); }
  )


  private user_data = (this.holder + 'accounts/user_info/');
  private distinct_companies = (this.holder + 'accounts/distinct_companies/');

  private urlbrand = (this.holder + 'reports/search_menu/');
  private urldeparments = (this.holder + 'reports/search_menu/');
  private category = (this.holder + 'reports/search_menu/');
  private sub_category = (this.holder + 'reports/search_menu/');
  private companies = (this.holder + 'reports/search_menu/');
  private product_group = (this.holder + 'reports/search_menu/');
  private product_type = (this.holder + 'reports/search_menu/');
  private asins = (this.holder + 'reports/search_menu/');
  private parent_asins = (this.holder + 'reports/search_menu/');
  private skus = (this.holder + 'reports/search_menu/');


  constructor(private httpClient: HttpClient, private sharedService: SharedService) { console.log(this.holder) }
  public sendGetRequestUserInfo() {
    return this.httpClient.get(this.user_data)
  }
  public sendGetRequestdistinctcompanies() {
    return this.httpClient.get(this.distinct_companies);
  }
  
  public sendGetRequestcompanies() {
    return this.httpClient.get(this.companies, { params: { 'drop_down_type': 'companies' }});
  }

  public sendGetRequestbrand() {
    return this.httpClient.get(this.urlbrand, { params: { 'drop_down_type': 'brands' }});
  }
  public sendGetRequestdepartment() {
    return this.httpClient.get(this.urldeparments, { params: { 'drop_down_type': 'departments' }});
  }
  public sendGetRequestcategory() {
    return this.httpClient.get(this.category, { params: { 'drop_down_type': 'categories' } });
  }

  public sendGetRequestsubcategory() {
    return this.httpClient.get(this.sub_category, { params: { 'drop_down_type': 'sub_categories' } });
  }

  public sendGetRequestproductgroup() {
    return this.httpClient.get(this.product_group, { params: { 'drop_down_type': 'product_groups' } });
  }

  public sendGetRequestproducttype() {
    return this.httpClient.get(this.product_type, { params: { 'drop_down_type': 'product_types' } });
  }

  public sendGetRequestasins() {
    return this.httpClient.get(this.asins, { params: { 'drop_down_type': 'asin' } });
  }

  public sendGetRequestparentasins() {
    return this.httpClient.get(this.parent_asins, { params: { 'drop_down_type': 'parent_asins' } });
  }

  public sendGetRequestskus() {
    return this.httpClient.get(this.skus, { params: { 'drop_down_type': 'skus' } });
  }




}




