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
  selector: 'app-available-inventory',
  templateUrl: './available-inventory.component.html',
  styleUrls: ['./available-inventory.component.scss']
})
export class AvailableInventoryComponent implements OnInit {
  Title = 'Available Inventory'
  clickEventsubscription: Subscription;
  clickEventsubscription2: Subscription;

  menu = true
  width = 100
  textSize = 12
  first_date: { 'first_date': '' };
  last_date: '';
  rowData: any;

  columnDefs = [
    {
      headerName: 'Groupings',
      children: [
        { headerName: 'Account', field: 'sku__company'},
        { headerName: 'Brand', field: 'sku__brand'},
        { headerName: 'Department', field: 'sku__department'},
        { headerName: 'Product Group', field: 'sku__product_group'},
        { headerName: 'Product Type', field: 'sku__product_type'},
        { headerName: 'Parent Asin', field: 'sku__parent_asin'},
        { headerName: 'Asin', field: 'sku__asin'},
        { headerName: 'SKU', field: 'sku' },]
    },
    {
      headerName: 'Product Details',
      children: [ 
        { headerName: 'Fulfillment Channel', field: 'fulfillment_channel'},
        { headerName: 'Merchant Shipping Group', field: 'merchant_shipping_group'},
        { headerName: 'Your Price', field: 'your_price'},
        { headerName: 'MFN Listing Exists', field: 'mfn_listing_exists'},
        { headerName: 'AFN Listing Exists', field: 'afn_listing_exists'},
      ]
    },
    {
      headerName: 'Metrics',
      children: [ 
        { headerName: 'Local Quantity', field: 'quantity'},
        { headerName: 'AFN Warehouse Quantity', field: 'afn_warehouse_quantity'},
        { headerName: 'AFN Fulfillable Quantity', field: 'afn_fulfillable_quantity'},
        { headerName: 'AFN Sellable Quantity', field: 'afn_unsellable_quantity'},
        { headerName: 'AFN Reserved Quantity', field: 'afn_reserved_quantity'},
      ]
    }
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
    this.titleService.setTitle("Available Inventory");
    this.data.currentTitle.subscribe(Title => this.Title = Title)
    this.data.changeTitle('Available Inventory')
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
    this.rowData = this.http.get<any>(holder + report, { params: { 'report_type': 'available_inventory' } });

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

    // FIRST BUTTON GROUP SETTINGS //
    if (Type_1 == "Timeframe") {
      if (Orientation_1 == "Portrait" || Orientation_1 == "") {
        if (Select_1 == "All") { }
        if (Select_1 == "Year") { this.gridColumnApi.addRowGroupColumns((['start_date__year'])) }
        if (Select_1 == "Year-Quarter") { this.gridColumnApi.addRowGroupColumns((['start_date__year', 'start_date__quarter'])) }
        if (Select_1 == "Year-Quarter-Month") { this.gridColumnApi.addRowGroupColumns((['start_date__year', 'start_date__quarter', 'start_date__month'])) }
        if (Select_1 == "Year-Month") { this.gridColumnApi.addRowGroupColumns((['start_date__year', 'start_date__month'])) }
        if (Select_1 == "Year-Week") { this.gridColumnApi.addRowGroupColumns((['start_date__year', 'start_date'])) }
        if (Select_1 == "Quarter") { this.gridColumnApi.addRowGroupColumns((['start_date__quarter'])) }
        if (Select_1 == "Month") { this.gridColumnApi.addRowGroupColumns((['start_date__month'])) }
        if (Select_1 == "Week") { this.gridColumnApi.addRowGroupColumns((['start_date'])) }
      }
      if (Orientation_1 == "Landscape") {
        if (Select_1 == "All") { }
        if (Select_1 == "Year") { this.gridColumnApi.addPivotColumns((['start_date__year'])) }
        if (Select_1 == "Year-Quarter") { this.gridColumnApi.addPivotColumns((['start_date__year', 'start_date__quarter'])) }
        if (Select_1 == "Year-Quarter-Month") { this.gridColumnApi.addPivotColumns((['start_date__year', 'start_date__quarter', 'start_date__month'])) }
        if (Select_1 == "Year-Month") { this.gridColumnApi.addPivotColumns((['start_date__year', 'start_date__month'])) }
        if (Select_1 == "Year-Week") { this.gridColumnApi.addPivotColumns((['start_date__year', 'start_date'])) }
        if (Select_1 == "Quarter") { this.gridColumnApi.addPivotColumns((['start_date__quarter'])) }
        if (Select_1 == "Month") { this.gridColumnApi.addPivotColumns((['start_date__month'])) }
        if (Select_1 == "Week") { this.gridColumnApi.addPivotColumns((['start_date'])) }
      }
    }
    if (Type_1 == "Product Details") {
      if (Orientation_1 == "Portrait" || Orientation_1 == "") {
        if (Select_1 == "Total") { }
        if (Select_1 == "Summary") { { this.gridColumnApi.addRowGroupColumns((['company_name', 'grouping'])) } }
        if (Select_1 == "Summary Breakout") { this.gridColumnApi.addRowGroupColumns((['company_name', 'grouping', 'sub_grouping'])) }
        if (Select_1 == "Detail") { this.gridColumnApi.addRowGroupColumns((['company_name', 'grouping', 'sub_grouping', 'transaction_type'])) }
        if (Select_1 == "Detail Breakout") { this.gridColumnApi.addRowGroupColumns((['company_name', 'grouping', 'sub_grouping', 'transaction_type', 'fee_type'])) }
      }
      if (Orientation_1 == "Landscape") {
        if (Select_1 == "Total") { }
        if (Select_1 == "Summary") { { this.gridColumnApi.addPivotColumns((['company_name', 'grouping'])) } }
        if (Select_1 == "Summary Breakout") { this.gridColumnApi.addPivotColumns((['company_name', 'grouping', 'sub_grouping'])) }
        if (Select_1 == "Detail") { this.gridColumnApi.addPivotColumns((['company_name', 'grouping', 'sub_grouping', 'transaction_type'])) }
        if (Select_1 == "Detail Breakout") { this.gridColumnApi.addPivotColumns((['company_name', 'grouping', 'sub_grouping', 'transaction_type', 'fee_type'])) }
      }
    }

    // SECOND BUTTON GROUP SETTINGS //
    if (Type_2 == "Timeframe") {
      if (Orientation_2 == "Portrait") {
        if (Select_2 == "All") { }
        if (Select_2 == "Year") { this.gridColumnApi.addRowGroupColumns((['start_date__year'])) }
        if (Select_2 == "Year-Quarter") { this.gridColumnApi.addRowGroupColumns((['start_date__year', 'start_date__quarter'])) }
        if (Select_2 == "Year-Quarter-Month") { this.gridColumnApi.addRowGroupColumns((['start_date__year', 'start_date__quarter', 'start_date__month'])) }
        if (Select_2 == "Year-Month") { this.gridColumnApi.addRowGroupColumns((['start_date__year', 'start_date__month'])) }
        if (Select_2 == "Year-Week") { this.gridColumnApi.addRowGroupColumns((['start_date__year', 'start_date'])) }
        if (Select_2 == "Quarter") { this.gridColumnApi.addRowGroupColumns((['start_date__quarter'])) }
        if (Select_2 == "Month") { this.gridColumnApi.addRowGroupColumns((['start_date__month'])) }
        if (Select_2 == "Week") { this.gridColumnApi.addRowGroupColumns((['start_date'])) }
      }
      if (Orientation_2 == "Landscape" || Orientation_2 == "") {
        if (Select_2 == "All") { }
        if (Select_2 == "Year") { this.gridColumnApi.addPivotColumns((['start_date__year'])) }
        if (Select_2 == "Year-Quarter") { this.gridColumnApi.addPivotColumns((['start_date__year', 'start_date__quarter'])) }
        if (Select_2 == "Year-Quarter-Month") { this.gridColumnApi.addPivotColumns((['start_date__year', 'start_date__quarter', 'start_date__month'])) }
        if (Select_2 == "Year-Month") { this.gridColumnApi.addPivotColumns((['start_date__year', 'start_date__month'])) }
        if (Select_2 == "Year-Week") { this.gridColumnApi.addPivotColumns((['start_date__year', 'start_date'])) }
        if (Select_2 == "Quarter") { this.gridColumnApi.addPivotColumns((['start_date__quarter'])) }
        if (Select_2 == "Month") { this.gridColumnApi.addPivotColumns((['start_date__month'])) }
        if (Select_2 == "Week") { this.gridColumnApi.addPivotColumns((['start_date'])) }
      }
    }
    if (Type_2 == "Product Details") {
      if (Orientation_2 == "Portrait") {
        if (Select_2 == "Total") { }
        if (Select_2 == "Summary") { { this.gridColumnApi.addRowGroupColumns((['company_name', 'grouping'])) } }
        if (Select_2 == "Summary Breakout") { this.gridColumnApi.addRowGroupColumns((['company_name', 'grouping', 'sub_grouping'])) }
        if (Select_2 == "Detail") { this.gridColumnApi.addRowGroupColumns((['company_name', 'grouping', 'sub_grouping', 'transaction_type'])) }
        if (Select_2 == "Detail Breakout") { this.gridColumnApi.addRowGroupColumns((['company_name', 'grouping', 'sub_grouping', 'transaction_type', 'fee_type'])) }
      }
      if (Orientation_2 == "Landscape" || Orientation_2 == "") {
        if (Select_2 == "Total") { }
        if (Select_2 == "Summary") { { this.gridColumnApi.addPivotColumns((['company_name', 'grouping'])) } }
        if (Select_2 == "Summary Breakout") { this.gridColumnApi.addPivotColumns((['company_name', 'grouping', 'sub_grouping'])) }
        if (Select_2 == "Detail") { this.gridColumnApi.addPivotColumns((['company_name', 'grouping', 'sub_grouping', 'transaction_type'])) }
        if (Select_2 == "Detail Breakout") { this.gridColumnApi.addPivotColumns((['company_name', 'grouping', 'sub_grouping', 'transaction_type', 'fee_type'])) }
      }
    }

    // THIRD BUTTON GROUP SETTINGS //
    if (Type_3 = "Timeframe") {
      if (Orientation_3 == "Portrait") {
        if (Select_3 == "All") { }
        if (Select_3 == "Year") { this.gridColumnApi.addRowGroupColumns((['start_date__year'])) }
        if (Select_3 == "Year-Quarter") { this.gridColumnApi.addRowGroupColumns((['start_date__year', 'start_date__quarter'])) }
        if (Select_3 == "Year-Quarter-Month") { this.gridColumnApi.addRowGroupColumns((['start_date__year', 'start_date__quarter', 'start_date__month'])) }
        if (Select_3 == "Year-Month") { this.gridColumnApi.addRowGroupColumns((['start_date__year', 'start_date__month'])) }
        if (Select_3 == "Year-Week") { this.gridColumnApi.addRowGroupColumns((['start_date__year', 'start_date'])) }
        if (Select_3 == "Quarter") { this.gridColumnApi.addRowGroupColumns((['start_date__quarter'])) }
        if (Select_3 == "Month") { this.gridColumnApi.addRowGroupColumns((['start_date__month'])) }
        if (Select_3 == "Week") { this.gridColumnApi.addRowGroupColumns((['start_date'])) }
      }
      if (Orientation_3 == "Landscape" || Orientation_3 == "") {
        if (Select_3 == "All") { }
        if (Select_3 == "Year") { this.gridColumnApi.addPivotColumns((['start_date__year'])) }
        if (Select_3 == "Year-Quarter") { this.gridColumnApi.addPivotColumns((['start_date__year', 'start_date__quarter'])) }
        if (Select_3 == "Year-Quarter-Month") { this.gridColumnApi.addPivotColumns((['start_date__year', 'start_date__quarter', 'start_date__month'])) }
        if (Select_3 == "Year-Month") { this.gridColumnApi.addPivotColumns((['start_date__year', 'start_date__month'])) }
        if (Select_3 == "Year-Week") { this.gridColumnApi.addPivotColumns((['start_date__year', 'start_date'])) }
        if (Select_3 == "Quarter") { this.gridColumnApi.addPivotColumns((['start_date__quarter'])) }
        if (Select_3 == "Month") { this.gridColumnApi.addPivotColumns((['start_date__month'])) }
        if (Select_3 == "Week") { this.gridColumnApi.addPivotColumns((['start_date'])) }
      }
    }
    if (Type_3 == "Product Details") {
      if (Orientation_3 == "Portrait") {
        if (Select_3 == "Total") { }
        if (Select_3 == "Summary") { { this.gridColumnApi.addRowGroupColumns((['company_name', 'grouping'])) } }
        if (Select_3 == "Summary Breakout") { this.gridColumnApi.addRowGroupColumns((['company_name', 'grouping', 'sub_grouping'])) }
        if (Select_3 == "Detail") { this.gridColumnApi.addRowGroupColumns((['company_name', 'grouping', 'sub_grouping', 'transaction_type'])) }
        if (Select_3 == "Detail Breakout") { this.gridColumnApi.addRowGroupColumns((['company_name', 'grouping', 'sub_grouping', 'transaction_type', 'fee_type'])) }
      }
      if (Orientation_3 == "Landscape" || Orientation_3 == "") {
        if (Select_3 == "Total") { }
        if (Select_3 == "Summary") { { this.gridColumnApi.addPivotColumns((['company_name', 'grouping'])) } }
        if (Select_3 == "Summary Breakout") { this.gridColumnApi.addPivotColumns((['company_name', 'grouping', 'sub_grouping'])) }
        if (Select_3 == "Detail") { this.gridColumnApi.addPivotColumns((['company_name', 'grouping', 'sub_grouping', 'transaction_type'])) }
        if (Select_3 == "Detail Breakout") { this.gridColumnApi.addPivotColumns((['company_name', 'grouping', 'sub_grouping', 'transaction_type', 'fee_type'])) }
      }

    }


    this.gridColumnApi.addValueColumn('amount')
    this.gridApi.sizeColumnsToFit();
  }


  teston() {
    var holder
    var endpoint = this.sharedService.sharedurl_prefix.subscribe(
      dataa => { console.log(dataa); holder = dataa }
      , errr => { console.log("error:", errr); }
    )
    var report = 'reports/reporturl/'
    var final = holder.concat(report.toString())


    // console.log(this.last_date)
    // this.rowData = this.http.post('http://127.0.0.1:8000/reports/profit_loss/', this.first_date,)
    this.rowData = this.http.post(final, this.first_date, { params: { 'report_type': 'available_inventory' } }).toPromise().then((e: any) => {
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

  post_request() {

  }
  // hide() {   
  //   if (this.menu == true) {
  //     this.menu = false
  //   } else {
  //     this.menu = true
  //   }
  // }
  // hideme() {   
  //   console.log("Hello Im Here")
  //   hide(this.menu)
  //   }


  refreshCells() {
    var params = {
      force: true
    };
    this.gridApi.refreshCells(params);

  }


  allInOne(offset: number) {
    if (offset > 0) {
      // increase(this.textSize,this.width,this.columnDefs,this.gridApi)
      this.refreshCells
    }
    else {
      // decrease(this.textSize,this.width,this.columnDefs,this.gridApi)
      this.refreshCells
    }
    const columnState = this.gridColumnApi?.getColumnState();
    console.log(columnState);

    columnState?.forEach((c) => {
      if (c.width) {
        console.log(c.width)
        this.gridColumnApi?.setColumnWidth(c.colId, c.width + offset);

      }

    });
  }





}

