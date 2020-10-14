import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { TitleService } from 'src/services&Validtors/title.service';
import { SharedService } from 'src/services&Validtors/shared.service';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-factory-forcast',
  templateUrl: './factory-forcast.component.html',
  styleUrls: ['./factory-forcast.component.scss']
})
export class FactoryForcastComponent implements OnInit {
  Title = 'Factory Forcast';
  columnDefs = [

    { headerName: 'Company name', field: 'company_name', },
    { headerName: 'Item Name', field: 'item_name' },
    { headerName: 'Item Description', field: 'item_description' },
    { headerName: 'Listing ID', field: 'listing_id', },
    { headerName: 'Seller SKU', field: 'seller_sku' },
    { headerName: 'Quantity', field: 'quantity', },
    { headerName: 'Open Date', field: 'open_date', },
    { headerName: 'Image URL', field: 'image_url', },
    { headerName: 'Item is in marketplace', field: 'item_is_marketplace', },
    { headerName: 'Product ID type', field: 'product_id_type', },
    { headerName: 'Zshop shipping fee', field: 'zshop_shipping_fee', },
    { headerName: 'Item note', field: 'item_note', },
    { headerName: 'Item condition', field: 'item_condition', },
    { headerName: 'Zshop category1', field: 'zshop_category1', },
    { headerName: 'Zshop browse path', field: 'zshop_browse_path', },
    { headerName: 'Zshop storefront feature', field: 'zshop_storefront_feature', },
    { headerName: 'Asin 1', field: 'asin1', },
    { headerName: 'Asin 2', field: 'asin2', },
    { headerName: 'Asin 3', field: 'asin3', },
    { headerName: 'Will Ship Internationally', field: 'will_ship_internationally', },
    { headerName: 'Expedited Shipping', field: 'expedited_shipping', },
    { headerName: 'Zshop boldface', field: 'zshop_boldface', },
    { headerName: 'Product ID', field: 'product_id', },
    { headerName: 'bid_for_featured_placement', field: 'bid_for_featured_placement', },
    { headerName: 'add_delete', field: 'add_delete', },
    { headerName: 'pending_quantity', field: 'pending_quantity', },
    { headerName: 'fulfillment_channel', field: 'fulfillment_channel', },
    { headerName: 'merchant_shipping_group', field: 'merchant_shipping_group', },
    { headerName: 'status', field: 'status', },
    { headerName: 'price', field: 'price', },





  ];



  rowData: any;







  gridOptions = {








    floatingFilter: false,
    animateRows: true,
    columnDefs: this.columnDefs,
    groupMultiAutoColumn: true,
    groupHideOpenParents: true,
    suppressMakeColumnVisibleAfterUnGroup: true,
    suppressAggFuncInHeader: false,
    suppressMenuHide: true,
    suppressColumnVirtualisation: true,








    autoGroupColumnDef: {

      resizable: true,




      filterValueGetter: function (params) {
        var colGettingGrouped = params.colDef.showRowGroup;
        var valueForOtherCol = params.api.getValue(
          colGettingGrouped,
          params.node
        );
        return valueForOtherCol;
      },




    }






  };

  gridApi: any;
  gridColumnApi: any;
  sideBar: any;
  defaultColDef: any;
  aggFuncs: any;
  icons: any;
  opened = true
  events = [];
  clickEventsubscription: Subscription;

  first_date: any;
  overlayLoadingTemplate;
  overlayNoRowsTemplate;






  constructor(private titleService: Title, private http: HttpClient, private data: TitleService, private sharedService: SharedService
  ) {
    this.clickEventsubscription = this.sharedService.getClickEvent().subscribe(() => {
      this.teston();
    }), this.defaultColDef = {
      flex: 1,
      minWidth: 200,
      filter: true,
      enableRowGroup: true,
      enablePivot: true,
      sortable: true,
      enableValue: true,

      cellFilter: 'number: 2',
      resizable: true,
      menuTabs: ['filterMenuTab', 'generalMenuTab', 'columnsMenuTab'],
      sortingOrder: ['asc', 'desc', 'null'],

      allowedAggFuncs: ['sum', 'avg', 'count'],
    }; this.aggFuncs = {
      sum: this.sumFunction,
      avg: this.avgAggFunction,


    }; this.sideBar = {
      toolPanels: [
        {
          id: 'columns',
          labelDefault: 'Columns',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel',
          toolPanelParams: { suppressSyncLayoutWithGrid: true },
        },
      ],
      defaultToolPanel: 'columns',
    }; this.overlayLoadingTemplate =
      '<span class="ag-overlay-loading-center">Report is currently unavailable</span>';
    this.overlayNoRowsTemplate =
      '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
  }

  ngOnInit() {
    this.data.currentTitle.subscribe(Title => this.Title = Title)
    this.data.changeTitle('Factory Forcast')
    // this.rowData = this.http.get('/api/reports/all_listing');



  }

  onGridReady(params) {
    this.titleService.setTitle("Factory forcast");

    //this.rowData = this.http.get('/api/reports/all_listing');
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;



    console.log('worked')





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

  pivoton() {
    this.gridColumnApi.setPivotMode(false);

    this.gridColumnApi.setRowGroupColumns(([]))

    this.gridApi.setFilterModel(null);

    this.gridApi.onFilterChanged();


    this.gridColumnApi.autoSizeColumns();
    this.gridColumnApi.setPivotMode(true);

    this.gridColumnApi.setRowGroupColumns((['seller_sku']))

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
  }




  teston() {
    console.log(this.first_date)

    //this.rowData = this.http.post('/api/reports/all_listing', this.first_date)

  }

}
