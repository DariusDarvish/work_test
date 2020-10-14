import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { TitleService } from 'src/services&Validtors/title.service';
import { DatesService } from 'src/services&Validtors/dates.service';
import { SettlementsReportComponent } from 'src/app/componenets/reports/payments_reports_folder/settlements-report/settlements-report.component';
import { SharedService } from 'src/services&Validtors/shared.service';
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common';
import { ListdataService } from 'src/services&Validtors/listdata.service';
import { MatSelectModule } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';




declare var jQuery: any;

declare var $: any;




@Component({
  selector: 'app-searchmenu',
  templateUrl: './searhmenu.component.html',
  styleUrls: ['./searhmenu.component.scss']
})
export class SearhmenuComponent implements OnInit {
  filteredOptions: Observable<string[]>;

  select2 = 'Select'
  today = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  drop_down_list = ['ASIN', 'Parent ASIN', 'SKU', 'Order ID'];
  date_dropdown = ['Current month', 'Last year', 'This year', 'Last month', 'First Quarter', 'Second Quarter', 'Third Quarter', 'Fouth Quarter'];
  ASIN_DICT = [];
  PARENT_ASIN_DICT = [];
  SKU_DICT = [];
  myBrand = new FormControl([]);
  the_dropdown_menu_select: string;
  current_type = 'ASIN'
  current_type_date_search = 'Current month'
  toDate: any;
  fromDate: any;

  Search_Toggle = false
  Advanced = false


  IDropdownSettings
  pipe = new DatePipe('en-US');
  dateForm = new FormGroup({
    first_date: new FormControl([this.pipe.transform(this.today, 'yyyy-MM-dd')]),
    last_date: new FormControl([this.pipe.transform(this.today, 'yyyy-MM-dd')]),
    brands: new FormControl([]),
    departments: new FormControl([]),
    accounts: new FormControl([]),
    categories: new FormControl([]),
    sub_categories: new FormControl([]),
    product_group: new FormControl([]),
    product_type: new FormControl([]),
    search_type: new FormControl('Drop Down'),
    search_type_value: new FormControl('')

  });

  Title: string;
  first_date = ''
  last_date = ''
  x = {};

  rowData: any;
  brandslist = [];
  departmentslist = [];
  categorylist = [];
  sub_categorylist = [];
  product_grouplist = [];
  product_typelist = [];
  companieslist = [];
  skulist = [];
  asinlist = [];
  parent_asinlist = [];
  expanded = false;



  rowDatalist: any;
  dropdownSettingsbrands: {};
  dropdownSettingsdepartments: {}
  dropdownSettingscompaines: {}
  dropdownSettingscategories: {}
  dropdownSettingssub_categories: {}
  dropdownSettingsproduct_group: {}
  dropdownSettingsproduct_type: {}
  dropdownSettingssku_type: {}
  dropdownSettingasin_type: {}
  dropdownSettingparentasin_type: {}


  selectedItemsBrands = [];
  selectedItemsDepartments = [];
  selectedItemsCompanies = [];
  selectedItemsCategories = [];
  selectedItemsSub_Categories = [];
  selectedItemsProduct_Group = [];
  selectedItemsProduct_Type = [];
  brandslistforpost = []
  selectedItemsSku = [];
  selectedItemsAsin = [];
  selectedItemsParentAsin = [];

  // current_settings = this.dropdownSettingasin_type
  current_placeholder = this.current_type
  current_data_4_dropdown = this.ASIN_DICT
  current_ngModel = this.selectedItemsAsin


  @ViewChild('select') select: MatSelectModule;



  constructor(private datePipe: DatePipe, private http: HttpClient, private edit: DatesService, private sharedService: SharedService, private dataService: ListdataService, private fb: FormBuilder) { }

  ngOnInit() {
    $('[data-widget="first-row-box"]').Treeview('init');
    this.make_dict()
    this.sharedService.sharedSearch_Toggle.subscribe(Search_Toggle => this.Search_Toggle = Search_Toggle)
    this.sharedService.sharedSearch_Toggle_Advanced.subscribe(Search_Toggle => this.Advanced = Search_Toggle)
    this.edit.currentfirst_date.subscribe(first_date => this.first_date = first_date)
    this.edit.currentlast_date.subscribe(last_date => this.last_date = last_date)


    this.dataService.sendGetRequestcompanies().subscribe((data: any[]) => {
      let tmp = [];
      for (let key in data)
        if (data.hasOwnProperty(key))
          tmp.push(data[key])
      // console.log(tmp)


      this.companieslist = tmp;
      console.log(this.companieslist)


    })


    this.dataService.sendGetRequestbrand().subscribe((data: any[]) => {
      let tmp = [];
      this.brandslist = data
      for (let key in data)
        if (data.hasOwnProperty(key))
          tmp.push(data[key])
      console.log(data)
      console.log('brands here')

      this.brandslist = tmp

    }
    )

    this.dataService.sendGetRequestdepartment().subscribe((data: any[]) => {
      let tmp = [];

      for (let key in data)
        if (data.hasOwnProperty(key))
          tmp.push(data[key])
      console.log(data)
      console.log('departments here')
      this.departmentslist = tmp

    })

    this.dataService.sendGetRequestcategory().subscribe((data: any[]) => {
      let tmp = [];

      for (let key in data)
        if (data.hasOwnProperty(key))
          tmp.push(data[key])
      this.categorylist = tmp;


    })
    this.dataService.sendGetRequestsubcategory().subscribe((data: any[]) => {
      let tmp = [];

      for (let key in data)
        if (data.hasOwnProperty(key))
          tmp.push(data[key])

      this.sub_categorylist = tmp;

    })

    this.dataService.sendGetRequestproductgroup().subscribe((data: any[]) => {
      let tmp = [];

      for (let key in data)
        if (data.hasOwnProperty(key))
          tmp.push(data[key])

      this.product_grouplist = tmp;

    })

    this.dataService.sendGetRequestproducttype().subscribe((data: any[]) => {
      let tmp = [];

      for (let key in data)
        if (data.hasOwnProperty(key))
          tmp.push(data[key])

      this.product_typelist = tmp;

    })

    this.dataService.sendGetRequestasins().subscribe((data: any[]) => {
      let tmp = [];

      for (let key in data)
        if (data.hasOwnProperty(key))
          tmp.push(data[key])

      this.asinlist = tmp;

    })


    this.dataService.sendGetRequestparentasins().subscribe((data: any[]) => {
      let tmp = [];

      for (let key in data)
        if (data.hasOwnProperty(key))
          tmp.push(data[key])

      this.parent_asinlist = tmp;

    })

    this.dataService.sendGetRequestskus().subscribe((data: any[]) => {
      let tmp = [];

      for (let key in data)
        if (data.hasOwnProperty(key))
          tmp.push(data[key])

      this.skulist = tmp;

    })




    this.ASIN_DICT = [

    ];

    this.SKU_DICT = [

    ];

    this.PARENT_ASIN_DICT = [

    ];

    this.selectedItemsBrands = [

    ];


    this.selectedItemsCompanies = [

    ];

    this.selectedItemsDepartments = [

    ];

    this.selectedItemsCategories = [

    ];

    this.selectedItemsSub_Categories = [

    ];

    this.selectedItemsProduct_Group = [

    ];

    this.selectedItemsProduct_Type = [

    ];




    this.dropdownSettingscompaines = {
      singleSelection: false,
      idField: 'company',
      textField: 'company',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    this.dropdownSettingsbrands = {
      singleSelection: false,
      idField: 'brand',
      textField: 'brand',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    this.dropdownSettingsdepartments = {
      singleSelection: false,
      idField: 'department',
      textField: 'department',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    this.dropdownSettingscategories = {
      singleSelection: false,
      idField: 'category',
      textField: 'category',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    this.dropdownSettingssub_categories = {
      singleSelection: false,
      idField: 'sub_category',
      textField: 'sub_category',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    this.dropdownSettingsproduct_group = {
      singleSelection: false,
      idField: 'product_group',
      textField: 'product_group',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };


    this.dropdownSettingsproduct_type = {
      singleSelection: false,
      idField: 'product_type',
      textField: 'product_type',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    this.dropdownSettingasin_type = {
      singleSelection: false,
      idField: 'asin',
      textField: 'asin',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    this.dropdownSettingparentasin_type = {
      singleSelection: false,
      idField: 'parent_asin',
      textField: 'parent_asin',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    this.dropdownSettingssku_type = {
      singleSelection: false,
      idField: 'sku',
      textField: 'sku',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    this.setDate()

  };




  onSubmit() {
    //TODO: Use EventEmitter with form value

    //change the values in ag-grid component
    //this.rowData = this.http.post('http://1.168.1.7:8000/reports/settlements_orders/',this.dateForm.value)

    this.x['first_date'] = this.dateForm.controls['first_date'].value;
    this.x['last_date'] = this.dateForm.controls['last_date'].value;
    this.fromDate = this.dateForm.controls['first_date'].value;
    this.toDate = this.dateForm.controls['last_date'].value;
    this.x['departments'] = this.dateForm.controls['departments'].value;
    this.x['accounts'] = this.dateForm.controls['accounts'].value;
    this.x['categories'] = this.dateForm.controls['categories'].value;
    this.x['sub_categories'] = this.dateForm.controls['sub_categories'].value;
    this.x['product_group'] = this.dateForm.controls['product_group'].value;
    this.x['product_type'] = this.dateForm.controls['product_type'].value;
    this.x['search_type'] = this.dateForm.controls['search_type'].value;
    this.x['search_type_value'] = this.dateForm.controls['search_type_value'].value;

    this.brandslistforpost = this.dateForm.controls['brands'].value;


    // for a list
    //   for (const key of Object.keys(country)) {
    //     const value = country[key]
    //     console.log(`${key} -> ${value}`)
    //  }



    this.x['brands'] = this.brandslistforpost

    this.edit.changefirst_date(this.x)
    console.warn(this.dateForm.value);
    console.trace()
    console.log("Click Event Ready to be sent")
    this.sharedService.sendClickEvent();
    console.log(this.fromDate)
    console.log(this.toDate)
    this.currentDate()



    // this.edit.changelast_date(this.dateForm.controls['last_date'].value)
  }
  // selectAll(ev){
  //   if(ev._selected){
  //     this.brands.setValue(['YMI']);
  //     ev._selected=true;
  //         }
  //         if(ev._selected==false){
  //           this.brands.setValue([]);
  //         }

  stayOpen() {
    event.stopPropagation()
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  onItemDeSelect(item: any) {
    console.log(item);
  }

  onChange(event) {
    this.current_type = event
    // if(event=='SKU'){
    //   this.current_settings=this.dropdownSettingssku_type
    //   this.current_placeholder=this.current_type
    //   this.current_data_4_dropdown=this.SKU_DICT
    //   this.current_ngModel=this.selectedItemsSku
    // }
    // if(event=='ASIN'){
    //   this.current_settings=this.dropdownSettingasin_type
    //   this.current_placeholder=this.current_type
    //   this.current_data_4_dropdown=this.ASIN_DICT
    //   this.current_ngModel=this.selectedItemsAsin
    // }
  }
  test() {
    return this.http.get('http://127.0.0.1:8000/reports/test/').toPromise().then((e: any[]) => {
      if (e) {
        console.log(e)
      }
    }).catch(() => {
      console.log('fail')
      return false;
    });

  }
  make_dict() { }
  //   return this.http.get('http://127.0.0.1:8000/reports/dropdown_search_menu_ASIN_SKU_PARENT_ASIN/').toPromise().then((e: any[]) => {
  //     if (e) {
  //       var tmp
  //       var keys
  //       var asin = 'asin'
  //       for (let key in e) {
  //         if (e.hasOwnProperty(key)) {
  //           if (e[key].hasOwnProperty('asin')) {
  //             this.ASIN_DICT.push(e[key]['asin'])
  //             //returns all the asins
  //           }
  //           if (e[key].hasOwnProperty('sku')) {
  //             this.SKU_DICT.push(e[key]['sku'])
  //             //returns all the sku
  //           }
  //           if (e[key].hasOwnProperty('parent_asin')) {
  //             this.PARENT_ASIN_DICT.push(e[key]['parent_asin'])

  //           }

  //         }
  //       }
  //       this.PARENT_ASIN_DICT = this.PARENT_ASIN_DICT.map(x => ({ parent_asin: x }))

  //       this.ASIN_DICT = this.ASIN_DICT.map(x => ({ asin: x }))

  //       this.SKU_DICT = this.SKU_DICT.map(x => ({ sku: x }))

  //     }

  //   }).catch(() => {
  //     console.log('fail')
  //     return false;
  //   });


  // }


  sendDate(event) {
    let date = new Date();
    console.log(event.target.value)
    if (event.target.value === 'Last year') {
      let firstdate = new Date(date.getFullYear() - 1, 0, 1)
      let lastdate = new Date(date.getFullYear() - 1, 12, 0)
      this.first_date = this.datePipe.transform(firstdate, 'yyyy-MM-dd')
      this.last_date = this.datePipe.transform(lastdate, 'yyyy-MM-dd')
      this.fromDate = this.first_date
      this.toDate = this.last_date
      console.log(this.fromDate)
      console.log(this.toDate)
    }
    if (event.target.value === 'This year') {
      let firstdate = new Date(date.getFullYear(), 0, 1)
      this.first_date = this.datePipe.transform(firstdate, 'yyyy-MM-dd')
      this.last_date = this.datePipe.transform(date, 'yyyy-MM-dd')
      this.fromDate = this.first_date
      this.toDate = this.last_date
      console.log(this.fromDate)
      console.log(this.toDate)
    }
    if (event.target.value === 'Last month') {
      let firstdate = new Date(date.getFullYear(), date.getMonth() - 1, 1)
      let lastdate = new Date(date.getFullYear(), date.getMonth(), 0)
      this.first_date = this.datePipe.transform(firstdate, 'yyyy-MM-dd')
      this.last_date = this.datePipe.transform(lastdate, 'yyyy-MM-dd')
      this.fromDate = this.first_date
      this.toDate = this.last_date
      console.log(this.fromDate)
      console.log(this.toDate)

    }
    if (event.target.value === 'First quarter') {
      let firstdate = new Date(date.getFullYear(), 0, 1)
      let lastdate = new Date(date.getFullYear(), 3, 0)
      this.first_date = this.datePipe.transform(firstdate, 'yyyy-MM-dd')
      this.last_date = this.datePipe.transform(lastdate, 'yyyy-MM-dd')
      this.fromDate = this.first_date
      this.toDate = this.last_date
      console.log(this.fromDate)
      console.log(this.toDate)

    }
    if (event.target.value === 'Second quarter') {
      let firstdate = new Date(date.getFullYear(), 3, 1)
      let lastdate = new Date(date.getFullYear(), 6, 0)
      this.first_date = this.datePipe.transform(firstdate, 'yyyy-MM-dd')
      this.last_date = this.datePipe.transform(lastdate, 'yyyy-MM-dd')
      this.fromDate = this.first_date
      this.toDate = this.last_date
      console.log(this.fromDate)
      console.log(this.toDate)

    }

    if (event.target.value === 'Third quarter') {
      let firstdate = new Date(date.getFullYear(), 6, 1)
      let lastdate = new Date(date.getFullYear(), 9, 0)
      this.first_date = this.datePipe.transform(firstdate, 'yyyy-MM-dd')
      this.last_date = this.datePipe.transform(lastdate, 'yyyy-MM-dd')
      this.fromDate = this.first_date
      this.toDate = this.last_date
      console.log(this.fromDate)
      console.log(this.toDate)

    }

    if (event.target.value === 'Fourth quarter') {
      let firstdate = new Date(date.getFullYear(), 9, 1)
      let lastdate = new Date(date.getFullYear(), 12, 0)
      this.first_date = this.datePipe.transform(firstdate, 'yyyy-MM-dd')
      this.last_date = this.datePipe.transform(lastdate, 'yyyy-MM-dd')
      this.fromDate = this.first_date
      this.toDate = this.last_date
      console.log(this.fromDate)
      console.log(this.toDate)

    }
    if (event.target.value === 'Current month') {
      this.setDate()
    }




  }

  setDate() {
    let date = new Date();
    let firstdate = new Date(date.getFullYear(), date.getMonth(), 1)
    let lastdate = new Date();
    // var lastdate = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    this.first_date = this.datePipe.transform(firstdate, 'yyyy-MM-dd')
    this.last_date = this.datePipe.transform(lastdate, 'yyyy-MM-dd')
    console.log(this.first_date)
    console.log(this.last_date)
    this.fromDate = this.first_date
    this.toDate = this.last_date



  }

  currentDate() {
    this.first_date = this.fromDate
    this.last_date = this.toDate
    console.log(this.fromDate)
    console.log(this.toDate)
  }

  changeDate(event) {
    console.log(event)




  }

  Toggle(event, item) {
    if (item == "Toggle") {
      // this.Search_Toggle = true
      this.sharedService.nextToggle(true)
    }
    if (item == "Advanced_true") {
      this.sharedService.nextToggleAdvanced(true)
    }
    if (item == "Advanced_false") { this.Advanced = false }

  }

  // ngOnDestroy() {
  //   this.sharedService.nextToggle(false)
  // }


}




