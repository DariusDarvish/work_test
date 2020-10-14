import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
// import { Service } from 'src/services&Validtors/.service';
import { SharedService } from 'src/services&Validtors/shared.service';
import { Subscription } from 'rxjs';
import { FilterComponent } from 'ag-grid-community/dist/lib/components/framework/componentTypes';
import { AuthService } from 'src/services&Validtors/auth.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadService } from 'src/services&Validtors/upload-service.service';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { concat } from 'rxjs';
import { } from '@angular/platform-browser';
import { request } from 'http';
import { Title } from '@angular/platform-browser';
import { TitleService } from 'src/services&Validtors/title.service';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { DomSanitizer } from '@angular/platform-browser';


declare var $: any;
@Component({
  selector: 'app-styles-detials',
  templateUrl: './styles-detials.component.html',
  styleUrls: ['./styles-detials.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})

export class StylesDetialsComponent implements OnInit {
  components;
  Title = 'Styles Detials';
  menu = true
  width = 100
  textSize = 12
  DJANGO_SERVER = 'http://127.0.0.1:8000/';
  public uploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver: boolean = false;

  columnDefs = [

    { headerName: 'Company name', field: 'company', editable: true, },
    { headerName: 'Brand', field: 'brand', editable: true, },
    { headerName: 'Department', field: 'department', editable: true, },
    { headerName: 'Binding', field: 'binding', editable: true, },
    { headerName: 'Label', field: 'label', editable: true, },
    { headerName: 'Product group', field: 'product_group', editable: true, },
    { headerName: 'Product type', field: 'product_type', editable: true, },
    { headerName: 'Category ID', field: 'category_id', editable: true, cellEditor: 'numericCellEditor', },
    { headerName: 'Rank', field: 'rank', editable: true, cellEditor: 'numericCellEditor', },
    { headerName: 'Category', field: 'category', editable: true, },
    { headerName: 'Sub Category', field: 'sub_category', editable: true, },
    { headerName: 'Parent asin', field: 'parent_asin', },
    { headerName: 'Asin id', field: 'asin_id', },
    { headerName: 'Sku', field: 'sku', },
    { headerName: 'Product id', field: 'product_id', editable: true, },
    { headerName: 'Parent style', field: 'parent_style', editable: true, },
    { headerName: 'Style', field: 'style', editable: true, },
    { headerName: 'Color', field: 'color', editable: true, },
    { headerName: 'Size', field: 'size', },
    { headerName: 'Product cost', field: 'product_cost', editable: true, cellEditor: 'numericCellEditor', },
    { headerName: 'Fulfillment Channel', field: 'fulfillment_channel', editable: true, },
    { headerName: 'Fulfillment cost', field: 'fufillment_cost', },
    { headerName: 'Vendor', field: 'vendor', editable: true, },
    { headerName: 'Lead time', field: 'lead_time', editable: true, },
    { headerName: 'Local warehouse quanty', field: 'local_warehouse_qty', editable: true, },
    { headerName: 'Case pack', field: 'case_pack', editable: true, },
    { headerName: 'Status', field: 'status', editable: true, },






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
  count = 0;
  send_dict = {};
  results = []
  toggle = false
  advanced = false
  Drop_Down_1 = ['Style_Drop_Down_1', 'Style_Drop_Down_2'];
  clickEventsubscription2;
  clickEventsubscription3;
  open_pop_up = false;
  test;
  clickEventsubscription4
  loadingBar = false




  constructor(private sanitizer: DomSanitizer, private titleService: Title, private uploadService: UploadService, private http: HttpClient, private data: TitleService, private sharedService: SharedService, private authService: AuthService, config: NgbModalConfig, private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;

    this.clickEventsubscription = this.sharedService.getClickEvent().subscribe(() => {
      this.teston();
    })

    this.clickEventsubscription2 = this.sharedService.getClickEvent4().subscribe((params) => { this.activate_loading(params) })

    this.clickEventsubscription3 = this.sharedService.getClickEvent5().subscribe((params) => { this.activate_loaded(params) })

    this.clickEventsubscription4 = this.sharedService.getClickEvent6().subscribe((params) => { this.onGridReady(params) })

      , this.defaultColDef = {
        width: this.width,
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
      };
    this.components = { numericCellEditor: this.getNumericCellEditor() };
    this.aggFuncs = {
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
    };
    this.overlayLoadingTemplate =
      '<span class="ag-overlay-loading-center">Loading...</span>';
    this.overlayNoRowsTemplate =
      '<span class="ag-overlay-loading-center">No data returned</span>';
  }

  ngOnInit() {
    this.titleService.setTitle("Style details");
    this.data.currentTitle.subscribe(Title => this.Title = Title)
    this.data.changeTitle('Style Details')
    this.sharedService.nextDropDownMenu(this.Drop_Down_1)
    this.sharedService.nexton_Style_Details(true)
    this.sharedService.sharedgridColumnApi.subscribe(x => this.gridColumnApi = x)
    this.sharedService.sharedgridApi.subscribe(x => this.gridApi = x)
    // this.rowData = this.http.get('/api/reports/all_listing');
  }

  ngOnDestroy() {
    this.sharedService.nexton_Style_Details(false)
  }

  onGridReady(params) {
    this.sharedService.sharedgridColumnApi.subscribe(x => this.gridColumnApi = x)
    this.sharedService.sharedgridApi.subscribe(x => this.gridApi = x)

    this.rowData = this.http.get('http://127.0.0.1:8000/reports/productdata/');
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    console.log('worked')

    this.sharedService.nextGridApi(this.gridApi)
    this.sharedService.nextGridColumnApi(this.gridColumnApi)

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
        if (!isKeyPressedNumeric(event)) {
          that.eInput.focus();
          if (event.preventDefault) event.preventDefault();
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

  onRowClicked(event: any) {
    console.log('row', event);
    this.count = this.count + 1
    console.log(this.count)
    this.results.push(event.data)
    console.log(this.results)
    this.sendData()
  }

  sendData() {
    this.authService.styledetailsupload({
      data: this.results
    }).subscribe(success => {
      if (success) {

      }
    });
  }


  open(content) {
    this.modalService.open(content);
  }


  fileOverBase(event): void {
    this.hasBaseDropZoneOver = event;
  }

  getFiles(): FileLikeObject[] {
    return this.uploader.queue.map((fileItem) => {
      return fileItem.file;
    });
  }

  public onFileDrop(fileList: File[]) {
    console.log(fileList);// u get file as fileList[0]
  }


  activate_loading(params) {

    this.sharedService.sharedgridColumnApi.subscribe(x => this.gridColumnApi = x)
    this.sharedService.sharedgridApi.subscribe(x => this.gridApi = x)
    console.log('active_loading')

    this.loadingBar = true

  }

  activate_loaded(params) {


    console.log('active_loaded')
    this.loadingBar = false


  }
  ngOnChanges(params) {

    this.onGridReady(params)


  }



}






