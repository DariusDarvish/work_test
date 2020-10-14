import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { TitleService } from 'src/services&Validtors/title.service';
import { DatesService } from 'src/services&Validtors/dates.service';
import { SharedService } from 'src/services&Validtors/shared.service';
import { Subscription } from 'rxjs';
import { _ } from 'ag-grid-community';
import { CurrencyCellRendererUSD, NumberCellRenderer, filterValueGetter, getRowStyle, increase, decrease } from 'src/services&Validtors/custom_functions_ag_grid'
import { EventEmitterService } from 'src/event-emitter.service';
import { Title } from '@angular/platform-browser';
import { AgGridService } from 'src/services&Validtors/ag-grid-manipulation'

@Component({
  selector: 'app-preformance-report',
  templateUrl: './performance-report.component.html',
  styleUrls: ['./performance-report.component.scss']
})
export class PreformanceReportComponent implements OnInit {
  Title = 'Orders'
  clickEventsubscription: Subscription;
  clickEventsubscription2: Subscription;

  menu = true
  width = 100
  textSize = 12
  first_date: { 'first_date': '' };
  last_date: '';
  rowData: any;

  columnDefs = [
    { headerName: 'ID', field: 'id', },
    { headerName: 'COMPANY', field: 'company', },
    { headerName: 'SKU', field: 'sku', },
    { headerName: 'STYLE', field: 'style', },
    { headerName: 'STYLE_COLOR', field: 'style_color', },
    { headerName: 'CATEGORY', field: 'category', },
    { headerName: 'BRAND', field: 'brand', },
    { headerName: 'GENDER', field: 'gender', },
    { headerName: 'PARENT_ASIN', field: 'parent_asin', },
    { headerName: 'ASIN', field: 'asin', },
    { headerName: 'COLOR', field: 'color', },
    { headerName: 'SIZE', field: 'size', },
    { headerName: 'UPC', field: 'upc', },
    { headerName: 'STATUS', field: 'status', },
    { headerName: 'LINK', field: 'link', },
    { headerName: 'STD_FINANCIAL_120_DAYS_FIELD', field: 'std_financial_120_days_field', },
    { headerName: 'CW_VALUE', field: 'cw_value', },
    { headerName: 'LW_FINANCIAL_7_DAYS_FIELD', field: 'lw_financial_7_days_field', },
    { headerName: 'LW_VALUE', field: 'lw_value', },
    { headerName: 'PRICING', field: 'pricing', },
    { headerName: 'PR_VALUE', field: 'pr_value', },
    { headerName: 'SALES', field: 'sales', },
    { headerName: 'LW', field: 'lw', },
    { headerName: 'NUMBER_2WK', field: 'number_2wk', },
    { headerName: 'NUMBER_3WK', field: 'number_3wk', },
    { headerName: 'NUMBER_4WK', field: 'number_4wk', },
    { headerName: 'INVENTORY_WOS', field: 'inventory_wos', },
    { headerName: 'INVENTORY', field: 'inventory', },
    { headerName: 'WOS', field: 'wos', },
    { headerName: 'ADVERTISING_LW_FIELD', field: 'advertising_lw_field', },
    { headerName: 'AD_VALUES', field: 'ad_values', },
    { headerName: 'TRAFFIC_LW_FIELD', field: 'traffic_lw_field', },
    { headerName: 'TRAFFIC_VALUES', field: 'traffic_values', },
    { headerName: 'LISTING_HEALTH', field: 'listing_health', },
    { headerName: 'HEALTH_VALUES', field: 'health_values', },
  ];



  gridApi: any;
  gridColumnApi: any;
  sideBar: any;
  defaultColDef: any;
  aggFuncs: any;
  icons: any;
  opened = true
  events = [];
  api: any;
  overlayLoadingTemplate;
  overlayNoRowsTemplate;
  Drop_Down_1 = ['Timeframe', 'Product Details']
  Drop_Down_2 = {
    first_field: [],
    second_field: ["All", "Year", "Year-Quarter", "Year-Quarter-Month", "Year-Month", "Year-Week", "Quarter", "Month", "Week"],
    third_field: ["Total", "Summary", "Summary Breakout", "Detail", "Detail Breakout"]
  }
  Drop_Down_Item_1 = "Type"

  First_Menu_Value_1: any;
  Second_Menu_Value_1: any;
  Third_Menu_Value_1: any;
  First_Menu_Value_2: any;
  Second_Menu_Value_2: any;
  Third_Menu_Value_2: any;
  First_Menu_Value_3: any;
  Second_Menu_Value_3: any;
  Third_Menu_Value_3: any;
  rowClassRules;
  gridOptions;


  constructor(private gridService: AgGridService, private titleService: Title, private http: HttpClient, private data: TitleService, private edit: DatesService, private sharedService: SharedService,) {
    this.clickEventsubscription = this.sharedService.getClickEvent().subscribe(() => { this.teston(); }),
      this.clickEventsubscription2 = this.sharedService.getClickEvent2().subscribe(() => { this.ButtonView1(); }),
      this.defaultColDef = this.gridService.defualtColDef(this.width);
    this.sideBar = this.gridService.createsidebar();
    this.overlayLoadingTemplate =
      '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
    this.overlayNoRowsTemplate =
      '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
  }



  ngOnInit() {
    this.titleService.setTitle("Performance Report");
    this.data.currentTitle.subscribe(Title => this.Title = Title)
    this.data.changeTitle('Performance Report')
    this.edit.currentfirst_date.subscribe(first_date => this.first_date = first_date)
    this.edit.currentlast_date.subscribe(last_date => this.last_date = last_date)
    // SUBSCRIBE TO THE FIRST GROUP OF BUTTONS //
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
    // PUSH THE DROP DOWN MENU VALUES TO THE BUTTONS COMPONENTS //
    this.sharedService.nextDropDownMenu(this.Drop_Down_1)
    this.sharedService.nextDropDownMenu2(this.Drop_Down_2)
    this.sharedService.nextDropDownMenuItem(this.Drop_Down_Item_1)
    this.sharedService.nextWidth(this.width)
    this.sharedService.nextTextSize(this.textSize)
    this.sharedService.nextColumnDef(this.columnDefs)
    this.gridOptions = this.gridService.create_gridoptions(this.columnDefs)
  }


  onGridReady(params) {
    var holder
    var endpoint = this.sharedService.sharedurl_prefix.subscribe(
      dataa => { console.log(dataa); holder = dataa }
      , errr => { console.log("error:", errr); }
    )
    var report = 'reports/reporturl/'
    var final = holder.concat(report.toString())
    this.rowData = this.http.get<any>(holder + report, { params: { 'report_type': 'performance_report' } });
    
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.sharedService.nextGridApi(this.gridApi)
    this.sharedService.nextGridColumnApi(this.gridColumnApi)

    var cols = params.columnApi.getAllColumns();
    cols.forEach(function (col) {
      var colDef = col.getUserProvidedColDef();
      // console.log(colDef.headerName + ', Column ID = ' + col.getId(), colDef);
    });
    console.log('worked')
    this.gridApi.sizeColumnsToFit();
  }



   //copy settelment reports 
   clearall() {
    this.gridService.clearall(this.gridColumnApi, this.gridApi)
  }

  ButtonView1() {
    console.log("Hello I worked")
    console.log(this.First_Menu_Value_1, this.Second_Menu_Value_1, this.Third_Menu_Value_1)
    console.log(this.First_Menu_Value_2, this.Second_Menu_Value_2, this.Third_Menu_Value_2)
    console.log(this.First_Menu_Value_3, this.Second_Menu_Value_3, this.Third_Menu_Value_3)

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

  }





  teston() {
    console.log(this.first_date)

    //this.rowData = this.http.post('/api/reports/all_listing', this.first_date)

  }

}
