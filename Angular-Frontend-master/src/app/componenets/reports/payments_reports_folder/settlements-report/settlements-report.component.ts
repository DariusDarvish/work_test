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
  selector: 'app-settlements-report',
  templateUrl: './settlements-report.component.html',
  styleUrls: ['./settlements-report.component.scss']
})
export class SettlementsReportComponent implements OnInit {
  Title = 'Settlements Reports'
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
      headerName: 'Categories',
      children: [
        {headerName: 'Account', field: 'sku__company', enableValue: false, editable: true, cellStyle: function (params) {return { fontSize: params.context.textSize + 'px' };},},
        {headerName: 'Brand', field: 'sku__brand', columnGroupShow: 'open', enableValue: false, cellStyle: function (params) {return { fontSize: params.context.textSize + 'px' };},},
        {headerName: 'Department', field: 'sku__department', columnGroupShow: 'open', enableValue: false, cellStyle: function (params) {return { fontSize: params.context.textSize + 'px'};},},
        {headerName: 'Category', field: 'sku__category', columnGroupShow: 'open', enableValue: false, cellStyle: function (params) {return { fontSize: params.context.textSize + 'px' };},},
        {headerName: 'Sub Category', field: 'sku__sub_category', columnGroupShow: 'open', enableValue: false, cellStyle: function (params) {return { fontSize: params.context.textSize + 'px' };},},
        {headerName: 'Binding', field: 'sku__binding', columnGroupShow: 'open', enableValue: false, cellStyle: function (params) {  return { fontSize: params.context.textSize + 'px' };},},
        {headerName: 'Label', field: 'sku__label', columnGroupShow: 'open', enableValue: false, cellStyle: function (params) {  return { fontSize: params.context.textSize + 'px' };},},
        {headerName: 'Product Group', field: 'sku__product_group', columnGroupShow: 'open', enableValue: false, cellStyle: function (params) {  return { fontSize: params.context.textSize + 'px' };},},
        {headerName: 'Product Type', field: 'sku__product_type', columnGroupShow: 'open', enableValue: false, cellStyle: function (params) {  return { fontSize: params.context.textSize + 'px' };},},
        {headerName: 'Vendor', field: 'sku__vender', columnGroupShow: 'open', enableValue: false, cellStyle: function (params) {  return { fontSize: params.context.textSize + 'px' };},},
      ]
    },

    {
      headerName: 'TimeFrame',
      children: [
        {headerName: 'Year', field: 'posted_date__year', enableValue: false, cellStyle: function (params) {  return { fontSize: params.context.textSize + 'px' };},},
        {headerName: 'Quarter', field: 'posted_date__quarter', columnGroupShow: 'open', enableValue: false, cellStyle: function (params) {  return { fontSize: params.context.textSize + 'px' };},},
        {headerName: 'Month Number', field: 'posted_date__month', columnGroupShow: 'open', enableValue: false, cellStyle: function (params) {  return { fontSize: params.context.textSize + 'px' };},},
        {headerName: 'Month Name', field: 'posted_date__month_name', columnGroupShow: 'open', enableValue: false, cellStyle: function (params) {  return { fontSize: params.context.textSize + 'px' };},},
        {headerName: 'Week', field: 'posted_date__week', columnGroupShow: 'open', enableValue: false, cellStyle: function (params) {  return { fontSize: params.context.textSize + 'px' };},},
        {headerName: 'Date', field: 'posted_date', columnGroupShow: 'open', enableValue: false, cellStyle: function (params) {  return { fontSize: params.context.textSize + 'px' };},},
      ]
    },

    {
      headerName: 'Style Details',
      children: [
        {headerName: 'Parent ASIN', field: 'sku__parent_asin', columnGroupShow: 'open', enableValue: false, cellStyle: function (params) {  return { fontSize: params.context.textSize + 'px' };},},
        {headerName: 'ASIN', field: 'sku__asin', enableValue: false, cellStyle: function (params) {  return { fontSize: params.context.textSize + 'px' };},},
        {headerName: 'SKU', field: 'sku', columnGroupShow: 'open', enableValue: false, cellStyle: function (params) {  return { fontSize: params.context.textSize + 'px' };},},
        {headerName: 'Color', field: 'sku__color', columnGroupShow: 'open', enableValue: false, cellStyle: function (params) {  return { fontSize: params.context.textSize + 'px' };},},
        {headerName: 'Size', field: 'sku__size', columnGroupShow: 'open', enableValue: false, cellStyle: function (params) {  return { fontSize: params.context.textSize + 'px' };},},
        {headerName: 'Case pack', field: 'sku__case_pack', columnGroupShow: 'open', enableValue: false, cellStyle: function (params) {  return { fontSize: params.context.textSize + 'px' };},},
      ]
    },

    {
      Name: 'Orders',
      headerName: 'Orders',
      children: [
        {headerName: 'Order Count', field: 'count', resizeable: true, cellRenderer: NumberCellRenderer, enableValue: true, cellEditor: 'numericCellEditor', cellStyle: function (params) {  return { fontSize: params.context.textSize + 'px' };},},
        {headerName: 'Total Quantity', field: 'total_qty', cellRenderer: NumberCellRenderer, cellEditor: 'numericCellEditor', cellStyle: function (params) {  return { fontSize: params.context.textSize + 'px' };},},
        {headerName: 'Quantity Sold', field: 'qty_sold', columnGroupShow: 'open', cellRenderer: NumberCellRenderer, cellEditor: 'numericCellEditor', cellStyle: function (params) {  return { fontSize: params.context.textSize + 'px' };},},
        {headerName: 'Quantity Returned', field: 'qty_returned', columnGroupShow: 'open', cellRenderer: NumberCellRenderer, cellStyle: function (params) {  return { fontSize: params.context.textSize + 'px' };},}
      ]
    },

    {
      headerName: 'Revenue',
      children: [
        {headerName: 'Total Revenue', field: 'total_revenue', cellRenderer: CurrencyCellRendererUSD, cellStyle: function (params) {  return { fontSize: params.context.textSize + 'px' };},},
        {headerName: 'Order Revenue', field: 'order_revenue', columnGroupShow: 'open', cellRenderer: CurrencyCellRendererUSD, cellStyle: function (params) {  return { fontSize: params.context.textSize + 'px' };},},
        {headerName: 'Promotion', field: 'promotion', columnGroupShow: 'open', cellRenderer: CurrencyCellRendererUSD, cellStyle: function (params) {  return { fontSize: params.context.textSize + 'px' };},},
        {headerName: 'Refund Revenue', field: 'refund_revenue', columnGroupShow: 'open', cellRenderer: CurrencyCellRendererUSD, cellStyle: function (params) {  return { fontSize: params.context.textSize + 'px' };},}
      ]
    },

    {
      headerName: 'COGS',
      children: [
        {headerName: 'COGS', field: 'total_cogs', cellRenderer: CurrencyCellRendererUSD, cellStyle: function (params) {  return { fontSize: params.context.textSize + 'px' };},},
        {headerName: 'Product Cost', field: 'sku__product_cost', columnGroupShow: 'open', cellRenderer: CurrencyCellRendererUSD, cellStyle: function (params) {  return { fontSize: params.context.textSize + 'px' };},},
        {headerName: 'Order COGS', field: 'order_cogs', columnGroupShow: 'open', cellRenderer: CurrencyCellRendererUSD, cellStyle: function (params) {  return { fontSize: params.context.textSize + 'px' };},},
        {headerName: 'Return COGS', field: 'refund_cogs', columnGroupShow: 'open', cellRenderer: CurrencyCellRendererUSD, cellStyle: function (params) {  return { fontSize: params.context.textSize + 'px' };},},

      ]
    },


    {
      headerName: 'Selling Fees',
      children: [
        {headerName: 'Seller Fees', field: 'seller_fees', cellRenderer: CurrencyCellRendererUSD, cellEditor: 'numericCellEditor', cellStyle: function (params) {  return { fontSize: params.context.textSize + 'px' };},},
        {headerName: 'Fulfillment fees', field: 'fulfillment_fees', columnGroupShow: 'open', cellRenderer: CurrencyCellRendererUSD, cellStyle: function (params) {  return { fontSize: params.context.textSize + 'px' };},},
        {headerName: 'Comission fees', field: 'comission_fees', columnGroupShow: 'open', cellRenderer: CurrencyCellRendererUSD, cellStyle: function (params) {  return { fontSize: params.context.textSize + 'px' };},},
        {headerName: 'Return Fees', field: 'return_fees', columnGroupShow: 'open', cellRenderer: CurrencyCellRendererUSD, cellStyle: function (params) {  return { fontSize: params.context.textSize + 'px' };},}
      ]
    },


    {
      headerName: 'Other Fees',
      children: [
        {headerName: 'All Other Fees', field: 'other', cellStyle: { color: '#000022', 'font-size': 'bold' }, cellRenderer: CurrencyCellRendererUSD},
        {headerName: 'Giftwrap',children: [  {    headerName: 'Giftwrap', field: 'giftwrap_total', cellStyle: function (params) {      return { fontSize: params.context.textSize + 'px' };    },  },  {    headerName: 'Giftwrap Collected', field: 'giftwrap_collected', columnGroupShow: 'open', cellRenderer: CurrencyCellRendererUSD, cellStyle: function (params) {      return { fontSize: params.context.textSize + 'px' };    },  },  {    headerName: 'Giftwarp Paid', field: 'giftwrap_paid', columnGroupShow: 'open', cellRenderer: CurrencyCellRendererUSD, cellStyle: function (params) {      return { fontSize: params.context.textSize + 'px' };    },  },], columnGroupShow: 'open'},
        {headerName: 'Goodwill',children: [  {    headerName: 'Goodwill', field: 'goodwill_total', cellRenderer: CurrencyCellRendererUSD, cellStyle: function (params) {      return { fontSize: params.context.textSize + 'px' };    },  },  {    headerName: 'Goodwill paid', field: 'goodwill_paid', columnGroupShow: 'open', cellRenderer: CurrencyCellRendererUSD, cellStyle: function (params) {      return { fontSize: params.context.textSize + 'px' };    },  },  {    headerName: 'Goodwill reimbursed', field: 'goodwill_reimbursed', columnGroupShow: 'open', cellRenderer: CurrencyCellRendererUSD, cellStyle: function (params) {      return { fontSize: params.context.textSize + 'px' };    },  },], columnGroupShow: 'open'},
        {headerName: 'Shipping Fees',children: [  {    headerName: 'Shipping Fees', field: 'shipping_fees_total', cellRenderer: CurrencyCellRendererUSD, cellStyle: function (params) {      return { fontSize: params.context.textSize + 'px' };    },  },  {    headerName: 'Shipping Fees Collected', field: 'shipping_fees_collected', columnGroupShow: 'open', cellRenderer: CurrencyCellRendererUSD, cellStyle: function (params) {      return { fontSize: params.context.textSize + 'px' };    },  },  {    headerName: 'Shipping fees paid', field: 'shipping_fees_paid', columnGroupShow: 'open', cellRenderer: CurrencyCellRendererUSD, cellStyle: function (params) {      return { fontSize: params.context.textSize + 'px' };    },  },], columnGroupShow: 'open'},
        {headerName: 'Sales Tax',children: [  {    headerName: 'Sales Tax', field: 'sales_tax_total', cellRenderer: CurrencyCellRendererUSD, cellStyle: function (params) {      return { fontSize: params.context.textSize + 'px' };    },  },  {    headerName: 'Sales Tax Collected', field: 'sales_tax_collected', columnGroupShow: 'open', cellRenderer: CurrencyCellRendererUSD, cellStyle: function (params) {      return { fontSize: params.context.textSize + 'px' };    },  },  {    headerName: 'Sales Tax Paid', field: 'sales_tax_paid', columnGroupShow: 'open', cellRenderer: CurrencyCellRendererUSD, cellStyle: function (params) {      return { fontSize: params.context.textSize + 'px' };    },  },], columnGroupShow: 'open'},
        {headerName: 'Shipping Tax',children: [  {    headerName: 'Shipping Tax', field: 'shipping_tax_total', cellStyle: function (params) {      return { fontSize: params.context.textSize + 'px' };    },  },  {    headerName: 'Shipping Tax Collected', field: 'shipping_tax_collected', columnGroupShow: 'open', cellRenderer: CurrencyCellRendererUSD, cellStyle: function (params) {      return { fontSize: params.context.textSize + 'px' };    },  },  {    headerName: 'Shipping Tax Paid', field: 'shipping_tax_paid', columnGroupShow: 'open', cellRenderer: CurrencyCellRendererUSD, cellStyle: function (params) {      return { fontSize: params.context.textSize + 'px' };    },  },], columnGroupShow: 'open'},
        {headerName: 'Other Fees',children: [  {    headerName: 'Additional Fees', field: 'other_fees_total', cellRenderer: CurrencyCellRendererUSD, cellStyle: function (params) {      return { fontSize: params.context.textSize + 'px' };    },  },  {    headerName: 'Closing fees', field: 'closing_fees', columnGroupShow: 'open', cellRenderer: CurrencyCellRendererUSD, cellStyle: function (params) {      return { fontSize: params.context.textSize + 'px' };    },  },  {    headerName: 'Sales Tax Service Fees', field: 'sales_tax_service_fees', columnGroupShow: 'open', cellRenderer: CurrencyCellRendererUSD, cellStyle: function (params) {      return { fontSize: params.context.textSize + 'px' };    },  },  {    headerName: 'Restock fees', field: 'restock_fees', columnGroupShow: 'open', cellRenderer: CurrencyCellRendererUSD, cellStyle: function (params) {      return { fontSize: params.context.textSize + 'px' };    },  },], columnGroupShow: 'open'},
        {headerName: 'Reimbursements', field: 'reimbursements', columnGroupShow: 'open', cellRenderer: CurrencyCellRendererUSD, cellStyle: function (params) {  return { fontSize: params.context.textSize + 'px' };},},
      ]
    },
    {
      headerName: 'Operating Fees',
      children: [
        {headerName: 'Operating Fees', field: 'total_operating_costs', cellRenderer: CurrencyCellRendererUSD, cellStyle: function (params) {  return { fontSize: params.context.textSize + 'px' };},},
        {headerName: 'Inbound Cost', field: 'inbound_cost', columnGroupShow: 'open', cellRenderer: CurrencyCellRendererUSD, cellStyle: function (params) {  return { fontSize: params.context.textSize + 'px' };},},
        {headerName: 'Storage Cost', field: 'storage_cost', columnGroupShow: 'open', cellRenderer: CurrencyCellRendererUSD, cellStyle: function (params) {  return { fontSize: params.context.textSize + 'px' };},},

      ]
    },
    {
      headerName: 'Profitability',
      children: [

        {headerName: 'Amazon Profit', field: 'amazon_profit', cellRenderer: CurrencyCellRendererUSD, cellStyle: function (params) {  return { fontSize: params.context.textSize + 'px' };},},
        {headerName: 'Gross Profit', field: 'gross_profit', cellRenderer: CurrencyCellRendererUSD, cellStyle: function (params) {  return { fontSize: params.context.textSize + 'px' };},},
        {headerName: 'Net Profit', field: 'net_profit', cellRenderer: CurrencyCellRendererUSD, cellStyle: function (params) {  return { fontSize: params.context.textSize + 'px' };},}]
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
  Drop_Down_1 = ['Timeframe', 'Category', 'Product Details']
  Drop_Down_2 = {
    first_field: [],
    second_field: ["All", "Year", "Year-Quarter", "Year-Quarter-Month", "Year-Month", "Year-Week", "Quarter", "Month", "Week"],
    third_field: ["Total","Account", "Brand", "Department", "Category", "Sub Category","Product Group","Product Type","Vendor"],
    // fourth_field: ["Account", "Brand", "Department", "Category", "Sub Category","Product Group","Product Type","Vendor"],
    
  }
  Drop_Down_Item_1 = "Type"

  First_Menu_Value_1: any;
  Second_Menu_Value_1: any;
  Third_Menu_Value_1: any;
  // Fourth_Menu_Value_1: any;
  First_Menu_Value_2: any;
  Second_Menu_Value_2: any;
  Third_Menu_Value_2: any;
  // Fourth_Menu_Value_2: any;
  First_Menu_Value_3: any;
  Second_Menu_Value_3: any;
  Third_Menu_Value_3: any;
  // Fourth_Menu_Value_3: any;
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
    this.titleService.setTitle("Settlements");
    this.data.currentTitle.subscribe(Title => this.Title = Title)
    this.data.changeTitle('Settlements')
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

    this.rowData = this.http.get<any>(holder + report, { params: { 'report_type': 'settlement_report' } });
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.sharedService.nextGridApi(this.gridApi)
    this.sharedService.nextGridColumnApi(this.gridColumnApi)
    // this.gridApi.autoSizeColumns = true;
    // params.api.sizeColumnsToFit();

    var allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach(function (column) {
      allColumnIds.push(column.colId);
    });
    console.log(allColumnIds)
    this.gridColumnApi.autoSizeColumns(allColumnIds);

    console.log('worked')
    console.log(this.rowData)
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
        if (Select_1 == "Year") { this.gridColumnApi.addRowGroupColumns((['posted_date__year'])) }
        if (Select_1 == "Year-Quarter") { this.gridColumnApi.addRowGroupColumns((['posted_date__year', 'posted_date__quarter'])) }
        if (Select_1 == "Year-Quarter-Month") { this.gridColumnApi.addRowGroupColumns((['posted_date__year', 'posted_date__quarter', 'posted_date__month'])) }
        if (Select_1 == "Year-Month") { this.gridColumnApi.addRowGroupColumns((['posted_date__year', 'posted_date__month'])) }
        if (Select_1 == "Year-Week") { this.gridColumnApi.addRowGroupColumns((['posted_date__year', 'posted_date'])) }
        if (Select_1 == "Quarter") { this.gridColumnApi.addRowGroupColumns((['posted_date__quarter'])) }
        if (Select_1 == "Month") { this.gridColumnApi.addRowGroupColumns((['posted_date__month'])) }
        if (Select_1 == "Week") { this.gridColumnApi.addRowGroupColumns((['posted_date'])) }
      }
      if (Orientation_1 == "Landscape") {
        if (Select_1 == "All") { }
        if (Select_1 == "Year") { this.gridColumnApi.addPivotColumns((['posted_date__year'])) }
        if (Select_1 == "Year-Quarter") { this.gridColumnApi.addPivotColumns((['posted_date__year', 'posted_date__quarter'])) }
        if (Select_1 == "Year-Quarter-Month") { this.gridColumnApi.addPivotColumns((['posted_date__year', 'posted_date__quarter', 'posted_date__month'])) }
        if (Select_1 == "Year-Month") { this.gridColumnApi.addPivotColumns((['posted_date__year', 'posted_date__month'])) }
        if (Select_1 == "Year-Week") { this.gridColumnApi.addPivotColumns((['posted_date__year', 'posted_date'])) }
        if (Select_1 == "Quarter") { this.gridColumnApi.addPivotColumns((['posted_date__quarter'])) }
        if (Select_1 == "Month") { this.gridColumnApi.addPivotColumns((['posted_date__month'])) }
        if (Select_1 == "Week") { this.gridColumnApi.addPivotColumns((['posted_date'])) }
      }
    }
    if (Type_1 == "Category") {
      if (Orientation_1 == "Portrait" || Orientation_1 == "") {
        if (Select_1 == "Total") { }
        if (Select_1 == "Account") { { this.gridColumnApi.addRowGroupColumns((['sku__company'])) } }
        if (Select_1 == "Brand") { { this.gridColumnApi.addRowGroupColumns((['sku__brand'])) } }
        if (Select_1 == "Department") { { this.gridColumnApi.addRowGroupColumns((['sku__department'])) } }
        if (Select_1 == "Category") { { this.gridColumnApi.addRowGroupColumns((['sku__category'])) } }
        if (Select_1 == "Sub Category") { { this.gridColumnApi.addRowGroupColumns((['sku__sub_category'])) } }
        if (Select_1 == "Product Group") { { this.gridColumnApi.addRowGroupColumns((['sku__product_group'])) } }
        if (Select_1 == "Product Type") { { this.gridColumnApi.addRowGroupColumns((['sku__product_type'])) } }
        if (Select_1 == "Vendor") { { this.gridColumnApi.addRowGroupColumns((['sku__vender'])) } }
      }
      if (Orientation_1 == "Landscape") {
        if (Select_1 == "Total") { }
        if (Select_1 == "Account") { { this.gridColumnApi.addPivotColumns((['sku__company'])) } }
        if (Select_1 == "Brand") { { this.gridColumnApi.addPivotColumns((['sku__brand'])) } }
        if (Select_1 == "Department") { { this.gridColumnApi.addPivotColumns((['sku__department'])) } }
        if (Select_1 == "Category") { { this.gridColumnApi.addPivotColumns((['sku__category'])) } }
        if (Select_1 == "Sub Category") { { this.gridColumnApi.addPivotColumns((['sku__sub_category'])) } }
        if (Select_1 == "Product Group") { { this.gridColumnApi.addPivotColumns((['sku__product_group'])) } }
        if (Select_1 == "Product Type") { { this.gridColumnApi.addPivotColumns((['sku__product_type'])) } }
        if (Select_1 == "Vendor") { { this.gridColumnApi.addPivotColumns((['sku__vender'])) } }
      }
    }

    // SECOND BUTTON GROUP SETTINGS //
    if (Type_2 == "Timeframe") {
      if (Orientation_2 == "Portrait") {
        if (Select_2 == "All") { }
        if (Select_2 == "Year") { this.gridColumnApi.addRowGroupColumns((['posted_date__year'])) }
        if (Select_2 == "Year-Quarter") { this.gridColumnApi.addRowGroupColumns((['posted_date__year', 'posted_date__quarter'])) }
        if (Select_2 == "Year-Quarter-Month") { this.gridColumnApi.addRowGroupColumns((['posted_date__year', 'posted_date__quarter', 'posted_date__month'])) }
        if (Select_2 == "Year-Month") { this.gridColumnApi.addRowGroupColumns((['posted_date__year', 'posted_date__month'])) }
        if (Select_2 == "Year-Week") { this.gridColumnApi.addRowGroupColumns((['posted_date__year', 'posted_date'])) }
        if (Select_2 == "Quarter") { this.gridColumnApi.addRowGroupColumns((['posted_date__quarter'])) }
        if (Select_2 == "Month") { this.gridColumnApi.addRowGroupColumns((['posted_date__month'])) }
        if (Select_2 == "Week") { this.gridColumnApi.addRowGroupColumns((['posted_date'])) }
      }
      if (Orientation_2 == "Landscape" || Orientation_2 == "") {
        if (Select_2 == "All") { }
        if (Select_2 == "Year") { this.gridColumnApi.addPivotColumns((['posted_date__year'])) }
        if (Select_2 == "Year-Quarter") { this.gridColumnApi.addPivotColumns((['posted_date__year', 'posted_date__quarter'])) }
        if (Select_2 == "Year-Quarter-Month") { this.gridColumnApi.addPivotColumns((['posted_date__year', 'posted_date__quarter', 'posted_date__month'])) }
        if (Select_2 == "Year-Month") { this.gridColumnApi.addPivotColumns((['posted_date__year', 'posted_date__month'])) }
        if (Select_2 == "Year-Week") { this.gridColumnApi.addPivotColumns((['posted_date__year', 'posted_date'])) }
        if (Select_2 == "Quarter") { this.gridColumnApi.addPivotColumns((['posted_date__quarter'])) }
        if (Select_2 == "Month") { this.gridColumnApi.addPivotColumns((['posted_date__month'])) }
        if (Select_2 == "Week") { this.gridColumnApi.addPivotColumns((['posted_date'])) }
      }
    }
    if (Type_2 == "Category") {
      if (Orientation_2 == "Portrait" || Orientation_2 == "") {
        if (Select_2 == "Total") { }
        if (Select_2 == "Account") { { this.gridColumnApi.addRowGroupColumns((['sku__company'])) } }
        if (Select_2 == "Brand") { { this.gridColumnApi.addRowGroupColumns((['sku__brand'])) } }
        if (Select_2 == "Department") { { this.gridColumnApi.addRowGroupColumns((['sku__department'])) } }
        if (Select_2 == "Category") { { this.gridColumnApi.addRowGroupColumns((['sku__category'])) } }
        if (Select_2 == "Sub Category") { { this.gridColumnApi.addRowGroupColumns((['sku__sub_category'])) } }
        if (Select_2 == "Product Group") { { this.gridColumnApi.addRowGroupColumns((['sku__product_group'])) } }
        if (Select_2 == "Product Type") { { this.gridColumnApi.addRowGroupColumns((['sku__product_type'])) } }
        if (Select_2 == "Vendor") { { this.gridColumnApi.addRowGroupColumns((['sku__vender'])) } }
      }
      if (Orientation_2 == "Landscape") {
        if (Select_2 == "Total") { }
        if (Select_2 == "Account") { { this.gridColumnApi.addPivotColumns((['sku__company'])) } }
        if (Select_2 == "Brand") { { this.gridColumnApi.addPivotColumns((['sku__brand'])) } }
        if (Select_2 == "Department") { { this.gridColumnApi.addPivotColumns((['sku__department'])) } }
        if (Select_2 == "Category") { { this.gridColumnApi.addPivotColumns((['sku__category'])) } }
        if (Select_2 == "Sub Category") { { this.gridColumnApi.addPivotColumns((['sku__sub_category'])) } }
        if (Select_2 == "Product Group") { { this.gridColumnApi.addPivotColumns((['sku__product_group'])) } }
        if (Select_2 == "Product Type") { { this.gridColumnApi.addPivotColumns((['sku__product_type'])) } }
        if (Select_2 == "Vendor") { { this.gridColumnApi.addPivotColumns((['sku__vender'])) } }
      }
    }

    // THIRD BUTTON GROUP SETTINGS //
    if (Type_3 = "Timeframe") {
      if (Orientation_3 == "Portrait") {
        if (Select_3 == "All") { }
        if (Select_3 == "Year") { this.gridColumnApi.addRowGroupColumns((['posted_date__year'])) }
        if (Select_3 == "Year-Quarter") { this.gridColumnApi.addRowGroupColumns((['posted_date__year', 'posted_date__quarter'])) }
        if (Select_3 == "Year-Quarter-Month") { this.gridColumnApi.addRowGroupColumns((['posted_date__year', 'posted_date__quarter', 'posted_date__month'])) }
        if (Select_3 == "Year-Month") { this.gridColumnApi.addRowGroupColumns((['posted_date__year', 'posted_date__month'])) }
        if (Select_3 == "Year-Week") { this.gridColumnApi.addRowGroupColumns((['posted_date__year', 'posted_date'])) }
        if (Select_3 == "Quarter") { this.gridColumnApi.addRowGroupColumns((['posted_date__quarter'])) }
        if (Select_3 == "Month") { this.gridColumnApi.addRowGroupColumns((['posted_date__month'])) }
        if (Select_3 == "Week") { this.gridColumnApi.addRowGroupColumns((['posted_date'])) }
      }
      if (Orientation_3 == "Landscape" || Orientation_3 == "") {
        if (Select_3 == "All") { }
        if (Select_3 == "Year") { this.gridColumnApi.addPivotColumns((['posted_date__year'])) }
        if (Select_3 == "Year-Quarter") { this.gridColumnApi.addPivotColumns((['posted_date__year', 'posted_date__quarter'])) }
        if (Select_3 == "Year-Quarter-Month") { this.gridColumnApi.addPivotColumns((['posted_date__year', 'posted_date__quarter', 'posted_date__month'])) }
        if (Select_3 == "Year-Month") { this.gridColumnApi.addPivotColumns((['posted_date__year', 'posted_date__month'])) }
        if (Select_3 == "Year-Week") { this.gridColumnApi.addPivotColumns((['posted_date__year', 'posted_date'])) }
        if (Select_3 == "Quarter") { this.gridColumnApi.addPivotColumns((['posted_date__quarter'])) }
        if (Select_3 == "Month") { this.gridColumnApi.addPivotColumns((['posted_date__month'])) }
        if (Select_3 == "Week") { this.gridColumnApi.addPivotColumns((['posted_date'])) }
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
    this.gridColumnApi.addValueColumns([
      'count', 'total_qty', 'qty_sold', 'qty_returned',
      'total_revenue', 'order_revenue', 'promotion', 'refund_revenue',
      'total_cogs', 'sku__product_cost', 'order_cogs', 'refund_cogs',
      'seller_fees', 'fulfillment_fees', 'comission_fees', 'return_fees', 'other', 'giftwrap_total',
      'giftwrap_collected', 'giftwrap_paid', 'goodwill_total', 'goodwill_paid', 'goodwill_reimbursed',
      'shipping_fees_total', 'shipping_fees_collected', 'shipping_fees_paid', 'sales_tax_total',
      'sales_tax_collected', 'sales_tax_paid', 'shipping_tax_total', 'shipping_tax_collected',
      'shipping_tax_paid', 'other_fees_total', 'closing_fees', 'sales_tax_service_fees', 'other_fees', 'restock_fees',
      'reimbursements', 'total_operating_costs', 'inbound_cost', 'storage_cost', 'amazon_profit', 'gross_profit', 'net_profit'])


    // this.gridColumnApi.autoSizeColumns('count');
    this.gridApi.sizeColumnsToFit();
  }




  teston() {

    console.log(this.first_date)
    console.log(this.last_date)
    var holder
    var endpoint = this.sharedService.sharedurl_prefix.subscribe(
      dataa => { console.log(dataa); holder = dataa }
      , errr => { console.log("error:", errr); }
    )
    var report = 'reports/reporturl/'
    var final = holder.concat(report.toString())

    this.rowData = this.http.post(final, this.first_date, { params: { 'report_type': 'settlement_report' } }).toPromise().then((e: any) => {
      if (e.length > 0) {
        this.overlayNoRowsTemplate ='<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
        return e
      }
      else {
        this.overlayNoRowsTemplate ='<span class="ag-overlay-loading-center">No data returned</span>';
        console.log(e)
      }


    }).catch(() => {
      console.log('fail')


      return false;
    });



  }


  getNumericCellEditor() {
    function isCharNumeric(charStr) {
      return !!/\d/.test(charStr);
    }
    function isKeyPressedNumeric(event) {
      var charCode = getCharCodeFromEvent(event);
      var charStr = String.fromCharCode(charCode);
      return isCharNumeric(charStr);
    }
    function getCharCodeFromEvent(event) {
      event = event || window.event;
      return typeof event.which === 'undefined' ? event.keyCode : event.which;
    }
    function NumericCellEditor() { }
    NumericCellEditor.prototype.init = function (params) {
      this.focusAfterAttached = params.cellStartedEdit;
      this.eInput = document.createElement('input');
      this.eInput.style.width = '100%';
      this.eInput.style.height = '100%';
      this.eInput.value = isCharNumeric(params.charPress)
        ? params.charPress
        : params.value;
      var that = this;
      this.eInput.addEventListener('keypress', function (event) {
        if (!isKeyPressedNumeric(event)) {that.eInput.focus();if (event.preventDefault) event.preventDefault();
        }
      });
    };
    NumericCellEditor.prototype.getGui = function () {
      return this.eInput;
    };
    NumericCellEditor.prototype.afterGuiAttached = function () {
      if (this.focusAfterAttached) {
        this.eInput.focus();
        this.eInput.select();
      }
    };
    NumericCellEditor.prototype.isCancelBeforeStart = function () {
      return this.cancelBeforeStart;
    };
    NumericCellEditor.prototype.isCancelAfterEnd = function () { };
    NumericCellEditor.prototype.getValue = function () {
      return this.eInput.value;
    };
    NumericCellEditor.prototype.focusIn = function () {
      var eInput = this.getGui();
      eInput.focus();
      eInput.select();
      console.log('NumericCellEditor.focusIn()');
    };
    NumericCellEditor.prototype.focusOut = function () {
      console.log('NumericCellEditor.focusOut()');
    };
    return NumericCellEditor;
  }





}
