import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { TitleService } from 'src/services&Validtors/title.service';
import { DatesService } from 'src/services&Validtors/dates.service';
import { SharedService } from 'src/services&Validtors/shared.service';
import { Subscription } from 'rxjs';
import { _ } from 'ag-grid-community';
import { Title } from '@angular/platform-browser';
import { AgGridService } from 'src/services&Validtors/ag-grid-manipulation'

@Component({
  selector: 'app-campaign-report',
  templateUrl: './campaign-report.component.html',
  styleUrls: ['./campaign-report.component.scss']
})
export class CampaignReportComponent implements OnInit {
  Title = 'Campaign Report'
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
      headerName: 'Campaign Details',
      children: [
        {
          headerName: 'Campaign ID', field: 'campaignid', enableValue: false, cellStyle: function (params) {
            return { fontSize: params.context.textSize + 'px' };
          },
        },
        {
          headerName: 'Campaign Name', field: 'campaignname', rowgroup: true, enableValue: false, cellStyle: function (params) {
            return { fontSize: params.context.textSize + 'px' };
          },
        },
        {
          headerName: 'Campaign Status', field: 'campaignstatus', enableValue: false, cellStyle: function (params) {
            return { fontSize: params.context.textSize + 'px' };
          },
        },
      ]
    },
    {
      headerName: 'TimeFrame',
      children: [
        {
          headerName: 'Year', field: 'dates__year', enableValue: false, cellStyle: function (params) {
            return { fontSize: params.context.textSize + 'px' };
          },
        },
        {
          headerName: 'Quarter', field: 'dates__quarter', enableValue: false, cellStyle: function (params) {
            return { fontSize: params.context.textSize + 'px' };
          },
        },
        {
          headerName: 'Month Number', field: 'dates__month', enableValue: false, cellStyle: function (params) {
            return { fontSize: params.context.textSize + 'px' };
          },
        },
        {
          headerName: 'Month', field: 'dates__month_name', enableValue: false, cellStyle: function (params) {
            return { fontSize: params.context.textSize + 'px' };
          },
        },
        {
          headerName: 'Date', field: 'dates', enableValue: false, cellStyle: function (params) {
            return { fontSize: params.context.textSize + 'px' };
          },
        },
      ]
    },
    {
      headerName: 'Metrics',
      children: [
        {
          headerName: 'Clicks', field: 'clicks', cellStyle: function (params) {
            return { fontSize: params.context.textSize + 'px' };
          },
        },
        {
          headerName: 'Impressions', field: 'impressions', cellStyle: function (params) {
            return { fontSize: params.context.textSize + 'px' };
          },
        },
        {
          headerName: 'Spend', field: 'cost', cellStyle: function (params) {
            return { fontSize: params.context.textSize + 'px' };
          },
        },
        {
          headerName: '1 Day Sales Attributed', field: 'attributedsales1d', cellStyle: function (params) {
            return { fontSize: params.context.textSize + 'px' };
          },
        },
        {
          headerName: '7 Day Sales Attributed', field: 'attributedsales7d', cellStyle: function (params) {
            return { fontSize: params.context.textSize + 'px' };
          },
        },
        {
          headerName: '14 Day Sales Attributed', field: 'attributedsales14d', cellStyle: function (params) {
            return { fontSize: params.context.textSize + 'px' };
          },
        },
        {
          headerName: '30 Day Sales Attributed', field: 'attributedsales30d', cellStyle: function (params) {
            return { fontSize: params.context.textSize + 'px' };
          },
        },
        {
          headerName: '1 Day Orders Attributed', field: 'attributedunitsordered1d', cellStyle: function (params) {
            return { fontSize: params.context.textSize + 'px' };
          },
        },
        {
          headerName: '7 Day Orders Attributed', field: 'attributedunitsordered7d', cellStyle: function (params) {
            return { fontSize: params.context.textSize + 'px' };
          },
        },
        {
          headerName: '14 Day Orders Attributed', field: 'attributedunitsordered14d', cellStyle: function (params) {
            return { fontSize: params.context.textSize + 'px' };
          },
        },
        {
          headerName: '30 Day Orders Attributed', field: 'attributedunitsordered30d', cellStyle: function (params) {
            return { fontSize: params.context.textSize + 'px' };
          },
        },
        {
          headerName: 'ROAS', id: 'ROAS', aggFunc: ratioAggFunc, valueGetter: ratioValueGetter,
          valueFormatter: ratioFormatter, cellStyle: function (params) {
            return { fontSize: params.context.textSize + 'px' };
          },
        },
      ]
    },
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

  constructor(private gridService: AgGridService, private titleService: Title, private http: HttpClient, private data: TitleService, private edit: DatesService, private sharedService: SharedService) {
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
    this.titleService.setTitle("Advertising Campaigns");
    this.data.currentTitle.subscribe(Title => this.Title = Title)
    this.data.changeTitle('Advertising Campaigns')
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
    this.rowData = this.http.get<any>(holder + report, { params: { 'report_type': 'advertising_campaign' } });
    var final = holder.concat(report.toString())
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
    var holder
    var endpoint = this.sharedService.sharedurl_prefix.subscribe(
      dataa => { console.log(dataa); holder = dataa }
      , errr => { console.log("error:", errr); }
    )
    var report = 'reports/reporturl/'
    var final = holder.concat(report.toString())

    this.rowData = this.http.post(final, this.first_date, { params: { 'report_type': 'advertising_campaign' } }).toPromise().then((e: any) => {
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


  }


function ratioValueGetter(params) {
  if (!params.node.group) {
    return createValueObject(params.data.attributedsales14d, params.data.cost);
  }
}
function ratioAggFunc(values) {
  var goldSum = 0;
  var silverSum = 0;
  values.forEach(function (value) {
    if (value && value.attributedsales14d) {
      goldSum += value.attributedsales14d;
    }
    if (value && value.cost) {
      silverSum += value.cost;
    }
  });
  return createValueObject(goldSum, silverSum);
}
function createValueObject(attributedsales14d, cost) {
  return {
    attributedsales14d: attributedsales14d,
    cost: cost,
    ToString: function () {
      return attributedsales14d && cost ? attributedsales14d / cost : 0;
    },
  };
}
function ratioFormatter(params) {
  if (!params.value || params.value === 0) return '';
  return '' + Math.round(params.value * 100) / 100;
}
function gcd(a, b) {
  if (isNaN(a) || b < 1e-7) return a;
  return gcd(b, Math.floor(a / b));
}
