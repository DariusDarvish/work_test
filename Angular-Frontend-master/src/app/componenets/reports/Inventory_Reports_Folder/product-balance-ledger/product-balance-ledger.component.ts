import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { TitleService } from 'src/services&Validtors/title.service';
import { DatesService } from 'src/services&Validtors/dates.service';
import { SharedService } from 'src/services&Validtors/shared.service';
import { Subscription } from 'rxjs';
import { CurrencyCellRendererUSD, NumberCellRenderer, filterValueGetter, getRowStyle } from 'src/services&Validtors/custom_functions_ag_grid'
import { Title } from '@angular/platform-browser';
import { AgGridService } from 'src/services&Validtors/ag-grid-manipulation'

@Component({
  selector: 'app-product-balance-ledger',
  templateUrl: './product-balance-ledger.component.html',
  styleUrls: ['./product-balance-ledger.component.scss']
})
export class ProductBalanceLedgerComponent implements OnInit {
  Title = 'Inventory Ledger'
  clickEventsubscription: Subscription;

  first_date: { 'first_date': '' };
  last_date: '';
  rowData: any;
  width = 100;
  textSize: 12;
  columnDefs = [
    {
      headerName: 'Category',
      children: [
        { headerName: 'Company', field: 'sku__company' },
        { headerName: 'Brand', field: 'sku__brand' },
        { headerName: 'Department', field: 'sku__department' },
        { headerName: 'Product Group', field: 'sku__product_group' },
        { headerName: 'Product Type', field: 'sku__product_type' },
        { headerName: 'Parent Asin', field: 'sku__parent_asin' },
        { headerName: 'Asin', field: 'sku__asin' },
        { headerName: 'SKU', field: 'sku' },
      ]
    },
    {
      headerName: 'Timeframe',
      children: [
        { headerName: 'Year', field: 'date__year', },
        { headerName: 'Quarter', field: 'date__quarter', },
        { headerName: 'Month Name', field: 'date__month_name', },
        { headerName: 'Month', field: 'date__month', },
        { headerName: 'Date', field: 'date', },
      ]
    },
    {
      headerName: 'Metrics',
      children: [
        { headerName: 'Balance', field: 'balance', cellRenderer: NumberCellRenderer },
        { headerName: 'Total Quantity', field: 'quantity', cellRenderer: NumberCellRenderer },
        { headerName: 'Received Units', field: 'qty_received' },
        { headerName: 'Shipped Units', field: 'qty_shipped' },
        { headerName: 'Returned Units', field: 'qty_returned' },
        { headerName: 'Units Removed', field: 'qty_removed' },
        { headerName: 'Units Transferred', field: 'qty_transferred' },
        { headerName: 'Units Adjusted', field: 'qty_adjusted' },
        { headerName: 'Cost of Inventory', field: 'cost_of_inventory', cellRenderer: CurrencyCellRendererUSD },
      ]
    },




    // ]
    // },

  ];

  gridOptions
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
  constructor(private gridService: AgGridService, private titleService: Title, private http: HttpClient, private data: TitleService, private edit: DatesService, private sharedService: SharedService) {
    this.clickEventsubscription = this.sharedService.getClickEvent().subscribe(() => {
      this.teston();
    })
    this.defaultColDef = this.gridService.defualtColDef(this.width);
    this.sideBar = this.gridService.createsidebar();
    this.overlayLoadingTemplate =
      '<span class="ag-overlay-loading-center">Report is currently unavailable</span>';
    this.overlayNoRowsTemplate =
      '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';


  }


  ngOnInit() {
    this.titleService.setTitle("Product balance");
    this.data.currentTitle.subscribe(Title => this.Title = Title)
    this.gridOptions = this.gridService.create_gridoptions(this.columnDefs)
    this.data.changeTitle('Inventory Ledger')
    this.edit.currentfirst_date.subscribe(first_date => this.first_date = first_date)
    this.edit.currentlast_date.subscribe(last_date => this.last_date = last_date)
    this.sharedService.nextWidth(this.width)
    this.sharedService.nextTextSize(this.textSize)
    this.sharedService.nextColumnDef(this.columnDefs)
  }
  onGridReady(params) {

    var holder
    var endpoint = this.sharedService.sharedurl_prefix.subscribe(
      dataa => { console.log(dataa); holder = dataa }
      , errr => { console.log("error:", errr); }
    )
    var report = 'reports/reporturl/'
    this.rowData = this.http.get<any>(holder + report, { params: { 'report_type': 'inventory_ledger' } });
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    console.log('worked')
    this.sharedService.nextGridApi(this.gridApi)
    this.sharedService.nextGridColumnApi(this.gridColumnApi)
  }
  clearall() {
    this.gridColumnApi.setPivotMode(false);

    this.gridColumnApi.setRowGroupColumns(([]))

    this.gridApi.setFilterModel(null);
    this.gridColumnApi.resetColumnState();
    this.gridColumnApi.resetColumnGroupState();
    this.gridApi.setSortModel(null);
    this.gridApi.onFilterChanged();

    this.gridApi.stopEditing(true);

    this.gridColumnApi.autoSizeColumns();



  }
  ButtonView1(event, item) {
    // this.gridApi.setFilterModel(null);
    this.gridColumnApi.setPivotMode(false);
    this.gridColumnApi.resetColumnState();
    this.gridColumnApi.resetColumnGroupState();
    this.gridColumnApi.setPivotMode(true);
    this.gridColumnApi.setRowGroupColumns(['date'])

    this.gridColumnApi.addValueColumns(['balance', 'cost_of_inventory'])
    // this.gridColumnApi.addPivotColumn('start_date', 'settlement_id')
    // this.gridColumnApi.setColumnsPinned(['count', 'grouping', 'sub_grouping'], 'left')
    // this.gridApi.expandAll()


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
    this.rowData = this.http.post(holder + report, this.first_date, { params: { 'report_type': 'inventory_ledger' } })
  }

}
