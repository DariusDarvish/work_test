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
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss']
})
export class AllordersComponent implements OnInit {
  Title = 'All Orders'
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
      headerName: 'TimeFrame',
      children: [
        { headerName: 'Date', field: 'date' },
        { headerName: 'Year', field: 'date__year' },
        { headerName: 'Quarter', field: 'date__quarter' },
        { headerName: 'Month', field: 'date__month' },
        { headerName: 'Month Name', field: 'date__month_name' },
        { headerName: 'Week', field: 'date__week' },
        { headerName: 'Rolling Week', field: 'date__rolling_week' },
        { headerName: 'Rolling Week #', field: 'date__rolling_week_num' },
        { headerName: 'Day', field: 'date__day_of_month' },

      ]
    },
    {
      headerName: 'Order Details',
      children: [
        { headerName: 'Account', field: 'company_name' },
        { headerName: 'Order ID', field: 'amazon_order_id' },
        { headerName: 'Order Status', field: 'order_status' },
        { headerName: 'Item Status', field: 'item_status' },
      ]
    },
    {
      headerName: 'Product Details',
      children: [
        { headerName: 'Sku', field: 'sku' },
        { headerName: 'Asin', field: 'asin' },
        { headerName: 'Brand', field: 'sku__brand' },
      ]
    },


    {
      headerName: 'Metrics',
      children: [
        { headerName: 'Quantity', field: 'quantity', cellRenderer: NumberCellRenderer },
        { headerName: 'Revenue', field: 'item_price', cellRenderer: CurrencyCellRendererUSD },
      ]
    },



  ]

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
    this.titleService.setTitle("All Orders");

    this.data.currentTitle.subscribe(Title => this.Title = Title)
    this.data.changeTitle('Orders')
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
    var holder = ''
    var endpoint = this.sharedService.sharedurl_prefix.subscribe(
      dataa => { console.log(dataa); holder = dataa }
      , errr => { console.log("error:", errr); }
    )
    var report = 'reports/reporturl/'

    this.rowData = this.http.get<any>(holder + report, { params: { 'report_type': 'all_orders' } });
    
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.sharedService.nextGridApi(this.gridApi)
    this.sharedService.nextGridColumnApi(this.gridColumnApi)

    var cols = params.columnApi.getAllColumns();
    cols.forEach(function (col) {
      var colDef = col.getUserProvidedColDef();
      console.log(colDef.headerName + ', Column ID = ' + col.getId(), colDef);
    });
    console.log('worked')
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
        if (Select_1 == "Year") { this.gridColumnApi.addRowGroupColumns((['date__year'])) }
        if (Select_1 == "Year-Quarter") { this.gridColumnApi.addRowGroupColumns((['date__year', 'date__quarter'])) }
        if (Select_1 == "Year-Quarter-Month") { this.gridColumnApi.addRowGroupColumns((['date__year', 'date__quarter', 'date__month'])) }
        if (Select_1 == "Year-Month") { this.gridColumnApi.addRowGroupColumns((['date__year', 'date__month'])) }
        if (Select_1 == "Year-Week") { this.gridColumnApi.addRowGroupColumns((['date__year', 'date'])) }
        if (Select_1 == "Quarter") { this.gridColumnApi.addRowGroupColumns((['date__quarter'])) }
        if (Select_1 == "Month") { this.gridColumnApi.addRowGroupColumns((['date__month'])) }
        if (Select_1 == "Week") { this.gridColumnApi.addRowGroupColumns((['date'])) }
      }
      if (Orientation_1 == "Landscape") {
        if (Select_1 == "All") { }
        if (Select_1 == "Year") { this.gridColumnApi.addPivotColumns((['date__year'])) }
        if (Select_1 == "Year-Quarter") { this.gridColumnApi.addPivotColumns((['date__year', 'date__quarter'])) }
        if (Select_1 == "Year-Quarter-Month") { this.gridColumnApi.addPivotColumns((['date__year', 'date__quarter', 'date__month'])) }
        if (Select_1 == "Year-Month") { this.gridColumnApi.addPivotColumns((['date__year', 'date__month'])) }
        if (Select_1 == "Year-Week") { this.gridColumnApi.addPivotColumns((['date__year', 'date'])) }
        if (Select_1 == "Quarter") { this.gridColumnApi.addPivotColumns((['date__quarter'])) }
        if (Select_1 == "Month") { this.gridColumnApi.addPivotColumns((['date__month'])) }
        if (Select_1 == "Week") { this.gridColumnApi.addPivotColumns((['date'])) }
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
        if (Select_2 == "Year") { this.gridColumnApi.addRowGroupColumns((['date__year'])) }
        if (Select_2 == "Year-Quarter") { this.gridColumnApi.addRowGroupColumns((['date__year', 'date__quarter'])) }
        if (Select_2 == "Year-Quarter-Month") { this.gridColumnApi.addRowGroupColumns((['date__year', 'date__quarter', 'date__month'])) }
        if (Select_2 == "Year-Month") { this.gridColumnApi.addRowGroupColumns((['date__year', 'date__month'])) }
        if (Select_2 == "Year-Week") { this.gridColumnApi.addRowGroupColumns((['date__year', 'date'])) }
        if (Select_2 == "Quarter") { this.gridColumnApi.addRowGroupColumns((['date__quarter'])) }
        if (Select_2 == "Month") { this.gridColumnApi.addRowGroupColumns((['date__month'])) }
        if (Select_2 == "Week") { this.gridColumnApi.addRowGroupColumns((['date'])) }
      }
      if (Orientation_2 == "Landscape" || Orientation_2 == "") {
        if (Select_2 == "All") { }
        if (Select_2 == "Year") { this.gridColumnApi.addPivotColumns((['date__year'])) }
        if (Select_2 == "Year-Quarter") { this.gridColumnApi.addPivotColumns((['date__year', 'date__quarter'])) }
        if (Select_2 == "Year-Quarter-Month") { this.gridColumnApi.addPivotColumns((['date__year', 'date__quarter', 'date__month'])) }
        if (Select_2 == "Year-Month") { this.gridColumnApi.addPivotColumns((['date__year', 'date__month'])) }
        if (Select_2 == "Year-Week") { this.gridColumnApi.addPivotColumns((['date__year', 'date'])) }
        if (Select_2 == "Quarter") { this.gridColumnApi.addPivotColumns((['date__quarter'])) }
        if (Select_2 == "Month") { this.gridColumnApi.addPivotColumns((['date__month'])) }
        if (Select_2 == "Week") { this.gridColumnApi.addPivotColumns((['date'])) }
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
        if (Select_3 == "Year") { this.gridColumnApi.addRowGroupColumns((['date__year'])) }
        if (Select_3 == "Year-Quarter") { this.gridColumnApi.addRowGroupColumns((['date__year', 'date__quarter'])) }
        if (Select_3 == "Year-Quarter-Month") { this.gridColumnApi.addRowGroupColumns((['date__year', 'date__quarter', 'date__month'])) }
        if (Select_3 == "Year-Month") { this.gridColumnApi.addRowGroupColumns((['date__year', 'date__month'])) }
        if (Select_3 == "Year-Week") { this.gridColumnApi.addRowGroupColumns((['date__year', 'date'])) }
        if (Select_3 == "Quarter") { this.gridColumnApi.addRowGroupColumns((['date__quarter'])) }
        if (Select_3 == "Month") { this.gridColumnApi.addRowGroupColumns((['date__month'])) }
        if (Select_3 == "Week") { this.gridColumnApi.addRowGroupColumns((['date'])) }
      }
      if (Orientation_3 == "Landscape" || Orientation_3 == "") {
        if (Select_3 == "All") { }
        if (Select_3 == "Year") { this.gridColumnApi.addPivotColumns((['date__year'])) }
        if (Select_3 == "Year-Quarter") { this.gridColumnApi.addPivotColumns((['date__year', 'date__quarter'])) }
        if (Select_3 == "Year-Quarter-Month") { this.gridColumnApi.addPivotColumns((['date__year', 'date__quarter', 'date__month'])) }
        if (Select_3 == "Year-Month") { this.gridColumnApi.addPivotColumns((['date__year', 'date__month'])) }
        if (Select_3 == "Year-Week") { this.gridColumnApi.addPivotColumns((['date__year', 'date'])) }
        if (Select_3 == "Quarter") { this.gridColumnApi.addPivotColumns((['date__quarter'])) }
        if (Select_3 == "Month") { this.gridColumnApi.addPivotColumns((['date__month'])) }
        if (Select_3 == "Week") { this.gridColumnApi.addPivotColumns((['date'])) }
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



    this.gridColumnApi.addValueColumns(['quantity'])
    this.gridApi.expandAll()
  }






  teston() {
    var holder
    var endpoint = this.sharedService.sharedurl_prefix.subscribe(
      dataa => { console.log(dataa); holder = dataa }
      , errr => { console.log("error:", errr); }
    )
    var report = 'reports/reporturl/'
    var final = holder.concat(report.toString())

    this.rowData = this.http.post(final, this.first_date, { params: { 'report_type': 'all_orders' } }).toPromise().then((e: any) => {
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
  sumFunction(values) {
    var result = 0;
    values.forEach(function (value) {
      if (typeof value === 'number') {
        result += value;
      }
    });
    return Math.round((result + Number.EPSILON) * 100) / 100;
  }


  avgAggFunction(values) {
    var sum = 0;
    var count = 0;
    values.forEach(function (value) {
      var groupNode =
        value !== null && value !== undefined && typeof value === 'object';
      if (groupNode) {
        sum += value.avg * value.count;
        count += value.count;
      } else {
        if (typeof value === 'number') {
          sum += value;
          count++;
        }
      }
    });
    if (count !== 0) {
      var avg = sum / count;
    } else {
      avg = null;
    }
    var result = {
      count: count,
      avg: avg,
      toString: function () {
        return Math.round((this.avg + Number.EPSILON) * 100) / 100;
      },
    };
    return result;

  }
  min(a, b) {
    var aMissing = typeof a !== 'number';
    var bMissing = typeof b !== 'number';
    if (aMissing && bMissing) {
      return null;
    } else if (aMissing) {
      return b;
    } else if (bMissing) {
      return a;
    } else if (a > b) {
      return b;
    } else {
      return a;
    }
  }
  max(a, b) {
    var aMissing = typeof a !== 'number';
    var bMissing = typeof b !== 'number';
    if (aMissing && bMissing) {
      return null;
    } else if (aMissing) {
      return b;
    } else if (bMissing) {
      return a;
    } else if (a < b) {
      return b;
    } else {
      return a;
    }
  }

  hide() {
    if (this.menu == true) {
      this.menu = false
    } else {
      this.menu = true
    }
  }



  increase() {
    this.textSize = this.textSize + .50
    console.log(this.textSize)
    this.width = this.width + .50
    console.log(this.width)
    this.gridApi.setColumnDefs(this.columnDefs);
    this.refreshCells()
  }

  decrease() {
    this.textSize = this.textSize - .50
    console.log(this.textSize)
    this.width = this.width - .50
    console.log(this.width)
    this.gridApi.setColumnDefs(this.columnDefs);
    this.refreshCells()
  }

  refreshCells() {
    var params = {
      force: true
    };
    this.gridApi.refreshCells(params);

  }


  allInOne(offset: number) {
    if (offset > 0) {
      this.increase()
    }
    else {
      this.decrease()
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

