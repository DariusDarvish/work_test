import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { TitleService } from 'src/services&Validtors/title.service';
import { SharedService } from 'src/services&Validtors/shared.service';
import { Subscription } from 'rxjs';
import { CurrencyCellRendererUSD } from 'src/services&Validtors/custom_functions_ag_grid'
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-balancesheet',
  templateUrl: './balancesheet.component.html',
  styleUrls: ['./balancesheet.component.scss']
})
export class BalancesheetComponent implements OnInit {
  Title = 'Balance Sheet';

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
      headerName: 'price', field: 'price', enableValue: true, cellStyle: function (params) {
        return { fontSize: params.context.textSize + 'px' };
      }
    }



  ];




  // CurrencyCellRendererUSD(params: any) {
  //   var inrFormat = new Intl.NumberFormat('en-US', {
  //     style: 'currency',
  //     currency: 'USD',
  //     minimumFractionDigits: 2
  //   });
  //   return inrFormat.format(params.value);
  // }


  rowData: any;







  gridOptions = {
    context: this,
    headerHeight: 35,
    floatingFilter: false,
    animateRows: true,
    columnDefs: this.columnDefs,
    groupMultiAutoColumn: true,
    groupHideOpenParents: true,
    suppressMakeColumnVisibleAfterUnGroup: true,
    suppressAggFuncInHeader: false,
    suppressMenuHide: true,
    enableCellChangeFlash: true,
    suppressColumnVirtualisation: true,
    groupSelectsChildren: true,
    autoGroupColumnDef: {
      resizable: true,
      pinned: 'left',
      filterValueGetter: function (params) {
        var colGettingGrouped = params.colDef.showRowGroup;
        var valueForOtherCol = params.api.getValue(
          colGettingGrouped,
          params.node
        );
        return valueForOtherCol;
      },
    },

    rowClassRules: {

    },

    // rowStyle: {
    //   background: 'black'
    // },
    // getRowStyle: function (params) {
    //   if (params.node.rowIndex % 2 === 0) {
    //     return { background: 'red' };
    //   }
    // }



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
  width = 100;

  first_date: any;

  overlayLoadingTemplate
  overlayNoRowsTemplate



  constructor(private titleService: Title, private http: HttpClient, private data: TitleService, private sharedService: SharedService,
  ) {
    this.clickEventsubscription = this.sharedService.getClickEvent().subscribe(() => {
      this.teston();
    }), this.defaultColDef = {


      filter: true,
      enableRowGroup: true,
      enablePivot: true,
      sortable: true,
      resizable: true,
      width: this.width,
      cellFilter: 'number: 2',

      menuTabs: ['filterMenuTab', 'generalMenuTab', 'columnsMenuTab'],
      sortingOrder: ['asc', 'desc', 'null'],


    }; this.overlayLoadingTemplate =
      '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
    this.overlayNoRowsTemplate =
      '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';

    // this.aggFuncs = {
    //   sum: this.sumFunction,
    //   avg: this.avgAggFunction,


    // };
    this.sideBar = {
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
    };
  }

  ngOnInit() {
    this.titleService.setTitle("Balance sheet report");
    this.data.currentTitle.subscribe(Title => this.Title = Title)
    this.data.changeTitle('Balances')
    // this.rowData = this.http.get('http://127.0.0.1:8000/reports/all_listing/');
  }

  onGridReady(params) {

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
  }


  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.datefileForm.value);

  }

  teston() {
    console.log(this.first_date)
    this.rowData = this.http.post('http://127.0.0.1:8000/reports/all_listing/', this.first_date)

  }

  //everyother group is a different color
  findgroups() {
    var x
    // x = this.gridColumnApi.getRowGroupColumns()
    x = this.gridApi.getDisplayedRowCount()
    console.log(x)


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


    columnState?.forEach((c) => {
      if (c.width) {

        this.gridColumnApi?.setColumnWidth(c.colId, c.width + offset);

      }

    });
  }


}
