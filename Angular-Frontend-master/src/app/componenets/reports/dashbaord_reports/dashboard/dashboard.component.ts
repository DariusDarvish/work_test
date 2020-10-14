import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { TitleService } from 'src/services&Validtors/title.service';
import { SharedService } from 'src/services&Validtors/shared.service';
import { Subscription } from 'rxjs';
import { formatNumber } from '@angular/common';
import { ColumnApi } from 'ag-grid-community';
import { CurrencyCellRendererUSD } from 'src/services&Validtors/custom_functions_ag_grid';
import { AgGridService } from 'src/services&Validtors/ag-grid-manipulation'
import { Title } from '@angular/platform-browser';
import { DatesService } from 'src/services&Validtors/dates.service';
import { AuthService } from 'src/services&Validtors/auth.service';


declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  styles: [' .ag-header-group-cell-label { }'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  Title = 'Dashboard';
  $: any;
  menu = true
  hoveredDate: NgbDate | null = null;
  textSize = 12
  fromDate: NgbDate;
  toDate: NgbDate | null = null;

  datefileForm = new FormGroup({
    first_date: new FormControl(''),
    last_date: new FormControl(''),
  });

  report_type


  columnDefs = [
    {
      headerName: 'Details',
      children: [
        {
          headerName: 'Company name', field: 'company_name', enableValue: false, cellStyle: function (params) {
            return { fontSize: params.context.textSize + 'px' };
          },
        },
        {
          headerName: 'Item Name', field: 'item_name', columnGroupShow: 'open', enableValue: false, cellStyle: function (params) {
            return { fontSize: params.context.textSize + 'px' };
          }
        },
        {
          headerName: 'Item Description', field: 'item_description', columnGroupShow: 'open', enableValue: false, cellStyle: function (params) {
            return { fontSize: params.context.textSize + 'px' };
          }
        },
      ]
    },
    {
      headerName: 'Company name', field: 'company_name', enableValue: false, cellStyle: function (params) {
        return { fontSize: params.context.textSize + 'px' };
      }
    },
    {
      headerName: 'Item Name', field: 'item_name', enableValue: false, cellStyle: function (params) {
        return { fontSize: params.context.textSize + 'px' };
      }
    },
    {
      headerName: 'Item Description', field: 'item_description', enableValue: false, cellStyle: function (params) {
        return { fontSize: params.context.textSize + 'px' };
      }
    },
    {
      headerName: 'Listing ID', field: 'listing_id', enableValue: false, cellStyle: function (params) {
        return { fontSize: params.context.textSize + 'px' };
      }
    },
    {
      headerName: 'Seller SKU', field: 'seller_sku', enableValue: false, cellStyle: function (params) {
        return { fontSize: params.context.textSize + 'px' };
      }
    },
    {
      headerName: 'Quantity', field: 'quantity', enableValue: true, cellStyle: function (params) {
        return { fontSize: params.context.textSize + 'px' };
      }
    },
    {
      headerName: 'Open Date', field: 'open_date', enableValue: false, cellStyle: function (params) {
        return { fontSize: params.context.textSize + 'px' };
      }
    },
    {
      headerName: 'Image URL', field: 'image_url', enableValue: false, cellStyle: function (params) {
        return { fontSize: params.context.textSize + 'px' };
      }
    },
    {
      headerName: 'Item is in marketplace', field: 'item_is_marketplace', enableValue: false, cellStyle: function (params) {
        return { fontSize: params.context.textSize + 'px' };
      }
    },
    {
      headerName: 'Product ID type', field: 'product_id_type', enableValue: false, cellStyle: function (params) {
        return { fontSize: params.context.textSize + 'px' };
      }
    },
    {
      headerName: 'Zshop shipping fee', field: 'zshop_shipping_fee', enableValue: true, cellStyle: function (params) {
        return { fontSize: params.context.textSize + 'px' };
      }
    },
    {
      headerName: 'Item note', field: 'item_note', enableValue: false, cellStyle: function (params) {
        return { fontSize: params.context.textSize + 'px' };
      }
    },
    {
      headerName: 'Item condition', field: 'item_condition', enableValue: false, cellStyle: function (params) {
        return { fontSize: params.context.textSize + 'px' };
      }
    },
    {
      headerName: 'Zshop category1', field: 'zshop_category1', enableValue: false, cellStyle: function (params) {
        return { fontSize: params.context.textSize + 'px' };
      }
    },
    {
      headerName: 'Zshop browse path', field: 'zshop_browse_path', enableValue: false, cellStyle: function (params) {
        return { fontSize: params.context.textSize + 'px' };
      }
    },
    {
      headerName: 'Zshop storefront feature', field: 'zshop_storefront_feature', enableValue: false, cellStyle: function (params) {
        return { fontSize: params.context.textSize + 'px' };
      }
    },
    {
      headerName: 'Asin 1', field: 'asin1', enableValue: false, cellStyle: function (params) {
        return { fontSize: params.context.textSize + 'px' };
      }
    },
    {
      headerName: 'Asin 2', field: 'asin2', enableValue: false, cellStyle: function (params) {
        return { fontSize: params.context.textSize + 'px' };
      }
    },
    {
      headerName: 'Asin 3', field: 'asin3', enableValue: false, cellStyle: function (params) {
        return { fontSize: params.context.textSize + 'px' };
      }
    },
    {
      headerName: 'Will Ship Internationally', field: 'will_ship_internationally', enableValue: false, cellStyle: function (params) {
        return { fontSize: params.context.textSize + 'px' };
      }
    },
    {
      headerName: 'Expedited Shipping', field: 'expedited_shipping', enableValue: false, cellStyle: function (params) {
        return { fontSize: params.context.textSize + 'px' };
      }
    },
    {
      headerName: 'Zshop boldface', field: 'zshop_boldface', enableValue: false, cellStyle: function (params) {
        return { fontSize: params.context.textSize + 'px' };
      }
    },
    {
      headerName: 'Product ID', field: 'product_id', enableValue: false, cellStyle: function (params) {
        return { fontSize: params.context.textSize + 'px' };
      }
    },
    {
      headerName: 'bid_for_featured_placement', field: 'bid_for_featured_placement', enableValue: false, cellStyle: function (params) {
        return { fontSize: params.context.textSize + 'px' };
      }
    },
    {
      headerName: 'add_delete', field: 'add_delete', enableValue: false, cellStyle: function (params) {
        return { fontSize: params.context.textSize + 'px' };
      }
    },
    {
      headerName: 'pending_quantity', field: 'pending_quantity', enableValue: false, cellStyle: function (params) {
        return { fontSize: params.context.textSize + 'px' };
      }
    },
    {
      headerName: 'fulfillment_channel', field: 'fulfillment_channel', enableValue: false, cellStyle: function (params) {
        return { fontSize: params.context.textSize + 'px' };
      }
    },
    {
      headerName: 'merchant_shipping_group', field: 'merchant_shipping_group', enableValue: false, cellStyle: function (params) {
        return { fontSize: params.context.textSize + 'px' };
      }
    },
    {
      headerName: 'status', field: 'status', enableValue: false, cellStyle: function (params) {
        return { fontSize: params.context.textSize + 'px' };
      }
    },
    {
      headerName: 'price', field: 'price', enableValue: true, cellRenderer: CurrencyCellRendererUSD, cellStyle: function (params) {
        return { fontSize: params.context.textSize + 'px' };
      }
    }



  ];


  rowData: any;
  gridOptions: any;
  gridApi: any;
  gridColumnApi: any;
  sideBar: any;
  defaultColDef: any;
  aggFuncs: any;
  icons: any;
  opened = true
  events = [];
  clickEventsubscription: Subscription;
  width = 100;
  first_date: { 'first_date': '' };
  Search_Toggle = false
  Advanced = false
  type = 'Type'
  Drop_Down_1 = ['Timeframe', 'Product Details']
  overlayNoRowsTemplate
  first_button
  second_button
  third_button
  clickEventsubscription3
  Drop_Down_2 = { first_field: ['1', '2', '3'], second_field: ['4', '5', '6'], third_field: ['7', '8', '9'] }
  clickEventsubscription2
  First_Menu_Value_1: any;
  Second_Menu_Value_1: any;
  Third_Menu_Value_1: any;
  First_Menu_Value_2: any;
  Second_Menu_Value_2: any;
  Third_Menu_Value_2: any;
  First_Menu_Value_3: any;
  Second_Menu_Value_3: any;
  Third_Menu_Value_3: any;
  report_Name;
  table_Object: any;

  greetingWidgets = [{
    position: { top: 1, height: 1, left: 1, width: 1 },
    text: 'Hi!'
  }, {
    position: { top: 1, height: 1, left: 2, width: 1 },
    text: 'Hello!'
  },
  {
    position: { top: 1, height: 1, left: 3, width: 1 },
    text: 'Hi!'
  }, {
    position: { top: 1, height: 1, left: 4, width: 1 },
    text: 'Hello!'
  },]


  additionPossible = true


  constructor(private authService: AuthService, private edit: DatesService, private titleService: Title, private http: HttpClient, private data: TitleService, private sharedService: SharedService, private gridService: AgGridService
  ) {
    this.clickEventsubscription = this.sharedService.getClickEvent().subscribe(() => {
      this.teston();
    }),
      this.clickEventsubscription2 = this.sharedService.getClickEvent7().subscribe((params) => { this.print_type(params) })
    this.clickEventsubscription3 = this.sharedService.getClickEvent2().subscribe(() => { this.show_buttons() })
    this.defaultColDef = this.gridService.defualtColDef(this.width);
    this.sideBar = this.gridService.createsidebar();
  }

  ngOnInit() {
    console.log(this.columnDefs)
    console.log(this.columnDefs)
    this.titleService.setTitle("Dashboard");
    this.sharedService.sharedreport_type.subscribe(x => this.report_type = x)
    console.log("Search_Toggle", this.Search_Toggle)
    this.edit.currentfirst_date.subscribe(first_date => this.first_date = first_date)
    this.data.currentTitle.subscribe(Title => this.Title = Title)
    this.data.changeTitle('Dashboard')
    this.rowData = this.http.get('http://127.0.0.1:8000/reports/all_listing/');
    this.gridOptions = this.gridService.create_gridoptions(this.columnDefs)
    this.sharedService.sharedSearch_Toggle.subscribe(Search_Toggle => this.Search_Toggle = Search_Toggle)
    this.sharedService.sharedSearch_Toggle_Advanced.subscribe(Search_Toggle => this.Advanced = Search_Toggle)
    // this.sharedService.sharedDrop_Down_Menu_1.subscribe(Drop_Down_1 => this.Drop_Down_1 = Drop_Down_1)
    this.sharedService.sharedfirst_menu_value_1.subscribe(x => this.first_button = x)
    this.sharedService.sharedsecond_menu_value_2.subscribe(x => this.second_button = x)
    this.sharedService.sharedthird_menu_value.subscribe(x => this.third_button = x)
    this.sharedService.nextDropDownMenu(this.Drop_Down_1)
    this.sharedService.nextDropDownMenuItem(this.type)
    this.sharedService.nextDropDownMenu2(this.Drop_Down_2)
    this.sharedService.nextWidth(this.width)
    this.sharedService.nextTextSize(this.textSize)
    this.sharedService.nextColumnDef(this.columnDefs)
    console.log(this.first_button)
    console.log(this.second_button)
    console.log(this.third_button)
    this.sharedService.sharedfirst_menu_value_1.subscribe(x => this.First_Menu_Value_1 = x)
    this.sharedService.sharedsecond_menu_value_1.subscribe(x => this.Second_Menu_Value_1 = x)
    this.sharedService.sharedthird_menu_value_1.subscribe(x => this.Third_Menu_Value_1 = x)
    // SUBSCRIBE TO THE SECOND GROUP OF BUTTONS //
    this.sharedService.sharedfirst_menu_value_2.subscribe(x => this.First_Menu_Value_2 = x)
    this.sharedService.sharedsecond_menu_value_2.subscribe(x => this.Second_Menu_Value_2 = x)
    this.sharedService.sharedthird_menu_value_2.subscribe(x => this.Third_Menu_Value_2 = x)
    // SUBSCRIBE TO THE THIRD GROUP OF BUTTONS //
    this.sharedService.sharedfirst_menu_value_3.subscribe(x => this.First_Menu_Value_3 = x)
    this.sharedService.sharedsecond_menu_value_3.subscribe(x => this.Second_Menu_Value_3 = x)
    this.sharedService.sharedthird_menu_value_3.subscribe(x => this.Third_Menu_Value_3 = x)
    this.sharedService.sharedreport_name.subscribe(x => this.report_Name = x)

    var holder
    var endpoint = this.sharedService.sharedurl_prefix.subscribe(
      dataa => { console.log(dataa); holder = dataa }
      , errr => { console.log("error:", errr); }
    )

    var report = 'reports/reporturl/'
    var final = holder.concat(report.toString())

    this.http.get<any>(holder + 'reports/report_views/').toPromise().then((e: any[]) => {
      if (e) {
        console.log('look here')
        console.log(typeof e)
        console.log(e)
        this.table_Object = e
        console.log('look here darius object')
        console.log(this.table_Object)
      }


    }).catch(() => {
      console.log('fail')


      return false;
    });



  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.sharedService.nextGridApi(this.gridApi)
    this.sharedService.nextGridColumnApi(this.gridColumnApi)

  }

  clearall() {
    this.gridService.clearall(this.gridColumnApi, this.gridApi)
  }

  pivoton() {
    this.gridColumnApi.setPivotMode(false);
    this.gridColumnApi.setRowGroupColumns(([]))
    this.gridApi.setFilterModel(null);
    this.gridApi.onFilterChanged();
    this.gridColumnApi.autoSizeColumns();
    this.gridColumnApi.setPivotMode(true);
    this.gridColumnApi.setRowGroupColumns((['company_name', 'item_name', 'listing_id']))
    this.findgroups()

  }

  filterom() {
    this.gridColumnApi.setPivotMode(false);
    this.gridColumnApi.setRowGroupColumns(([]))
    this.gridApi.setFilterModel(null);
    this.gridApi.onFilterChanged();
    this.gridColumnApi.autoSizeColumns();
    var countryFilterComponent = this.gridApi.getFilterInstance('product_id_type');



    var model = {
      type: 'set',
      values: ['3'],
    };
    countryFilterComponent.setModel(model);
    this.gridApi.onFilterChanged();

  }



  pivoton2() {

    this.gridColumnApi.setPivotMode(false);
    this.gridColumnApi.setRowGroupColumns(([]))
    this.gridApi.setFilterModel(null);
    this.gridApi.onFilterChanged();
    this.gridColumnApi.autoSizeColumns();
    this.gridColumnApi.setPivotMode(true);
    this.gridColumnApi.setRowGroupColumns((['asin1']))
    //this.gridService.pivoton2(this.gridApi,this.gridColumnApi)
  }


  onSubmit() {
    console.log("Check Over Here")
    // TODO: Use EventEmitter with form value
    console.warn(this.datefileForm.value);

  }

  teston() {
    var holder
    var endpoint = this.sharedService.sharedurl_prefix.subscribe(
      dataa => { console.log(dataa); holder = dataa }
      , errr => { console.log("error:", errr); }
    )
    var report = 'reports/reporturl/'
    var final = holder.concat(report.toString())

    this.rowData = this.http.post(final, this.first_date, { params: { 'report_type': this.report_type } }).toPromise().then((e: any) => {
      if (e.length > 0) {
        this.overlayNoRowsTemplate =
          '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
        return e
      }
      else {
        this.overlayNoRowsTemplate =
          '<span class="ag-overlay-loading-center">No data returned</span>';
        console.log(e)
      }
    }).catch(() => {
      console.log('fail')
      return false;
    });
  }




  //everyother group is a different color
  findgroups() {
    var x
    // x = this.gridColumnApi.getRowGroupColumns()
    x = this.gridApi.getDisplayedRowCount()
    console.log(x)


  }


  show() {
    // this.menu = this.gridService.hide(this.menu)
    this.sharedService.nextToggle(false)
    // console.log(this.Search_Toggle)
  }

  print_type(params) {
    console.log(this.report_type)
    this.data.changeTitle(this.report_type)
    var holder
    var endpoint = this.sharedService.sharedurl_prefix.subscribe(
      dataa => { console.log(dataa); holder = dataa }
      , errr => { console.log("error:", errr); }
    )

    var report = 'reports/reporturl/'
    var final = holder.concat(report.toString())

    this.http.get<any>(holder + 'reports/column_def/').toPromise().then((e: any[]) => {
      if (e) {
        console.log('look here')
        console.log(typeof e)
        console.log(e)
        this.columnDefs = e
        console.log(this.columnDefs)
      }


    }).catch(() => {
      console.log('fail')


      return false;
    });


    this.rowData = this.http.get<any>(holder + report, { params: { 'report_type': this.report_type } });



  }



  show_buttons() {
    console.log(this.First_Menu_Value_1, this.Second_Menu_Value_1, this.Third_Menu_Value_1)
    console.log(this.First_Menu_Value_2, this.Second_Menu_Value_2, this.Third_Menu_Value_2)
    console.log(this.First_Menu_Value_3, this.Second_Menu_Value_3, this.Third_Menu_Value_3)
    console.log(this.report_Name)

    var Report_type = this.report_Name

    var Type_1 = this.First_Menu_Value_1
    var Type_2 = this.First_Menu_Value_2
    var Type_3 = this.First_Menu_Value_3

    var Select_1 = this.Second_Menu_Value_1
    var Select_2 = this.Second_Menu_Value_2
    var Select_3 = this.Second_Menu_Value_3

    var Orientation_1 = this.Third_Menu_Value_1
    var Orientation_2 = this.Third_Menu_Value_2
    var Orientation_3 = this.Third_Menu_Value_3

    this.gridApi.setFilterModel(null);
    this.gridApi.onFilterChanged();
    this.gridColumnApi.resetColumnState();
    this.gridColumnApi.resetColumnGroupState();
    this.gridColumnApi.setPivotMode(true);

    // if (Select_1 != "") {
    // console.log('this should only execute after select 1')
    var key = (Report_type + '_' + Type_1 + '_' + Select_1).toUpperCase()
    console.log(key)
    var type = this.table_Object[key]


    var input = type.substring(1, type.length - 1)
    console.log(input)
    this.gridColumnApi.addRowGroupColumns(([input]))
    // }
    // }

  }




  onGridFull(isGridFull) {
    if (isGridFull) {

    }
    else {
      console.log('open')
    }
  }

  addWidget(event) {

    console.log(event)
    var greeting = 'test'



    var widget = {
      position: { top: 1, height: 1, left: 5, width: 1 },
      text: greeting
    };
    this.greetingWidgets.push(widget);
    console.log(greeting)
  }


  removeWidget(widget) {
    console.log('click')
    var idx = this.greetingWidgets.indexOf(widget);
    if (idx > -1) {
      this.greetingWidgets.splice(idx, 1);
    }
  }


}
