import { Component, OnInit, ElementRef, ɵConsole } from '@angular/core';
import { SharedService } from 'src/services&Validtors/shared.service';
import { AgGridService } from 'src/services&Validtors/ag-grid-manipulation'
import { concat, Subscription } from 'rxjs';
import { warn } from 'console';
import { UploadService } from 'src/services&Validtors/upload-service.service';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { request } from 'http';
import { NgxCSVParserError } from 'ngx-csv-parser';
import * as Papa from 'papaparse';
import { parseMessage } from '@angular/localize/src/utils';
import { HttpClient } from '@angular/common/http';




declare var $: any;
@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class ButtonsComponent implements OnInit {
  DJANGO_SERVER = 'http://127.0.0.1:8000/';
  public uploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver: boolean = false;
  Search_Toggle
  Advanced
  Report_Type = "Type"

  group1 = "group1"
  group2 = "group2"
  group3 = "group3"

  Second_Group = false
  Third_Group = false

  set_true = true
  set_false = false

  Orientation_1 = "Orientation"
  Orientation_2 = "Orientation"
  Orientation_3 = "Orientation"
  portrait = 'Portrait'
  landscape = 'Landscape'

  Drop_Down_1: any = []
  Drop_Down_2: any = []

  Drop_Down_1_Value_1 = 'Type';
  Drop_Down_2_Value_1 = 'Select';
  Drop_Down_1_Index_1 = 0

  Second_Drop_Down_Fields_1 = [];

  Drop_Down_1_Value_2 = 'Type'
  Drop_Down_2_Value_2 = 'Select'
  Drop_Down_1_Index_2 = 0

  Second_Drop_Down_Fields_2 = [];

  Drop_Down_1_Value_3 = 'Type'
  Drop_Down_2_Value_3 = 'Select'
  Drop_Down_1_Index_3 = 0

  Second_Drop_Down_Fields_3 = [];


  gridColumnApi
  gridApi
  width
  textSize
  columnDefs
  defaultColDef
  first_menu_value_1 = this.Drop_Down_1_Value_1
  first_menu_value_2 = this.Drop_Down_1_Value_2
  first_menu_value_3 = this.Drop_Down_1_Value_3
  second_menu_value_1 = this.Drop_Down_2_Value_1
  second_menu_value_2 = this.Drop_Down_2_Value_2
  second_menu_value_3 = this.Drop_Down_2_Value_3
  third_menu_value_1
  third_menu_value_2
  third_menu_value_3
  side_nav
  screen_width
  clickEventsubscription3: Subscription;
  on_Style_Details
  csvRecords: any[] = [];
  header = false;
  csvContent: any;
  safe_File: any;
  yes_safe = true;
  no_safe = false;
  dataList: any[];
  button_Object: any;
  first_button = [];
  second_button = [];
  second_button_drop_down = [];
  report_name;

  constructor(private http: HttpClient, private elementRef: ElementRef, private uploadService: UploadService, private sharedService: SharedService, private gridService: AgGridService, config: NgbModalConfig, private modalService: NgbModal) {
    this.sharedService.getClickEvent3().subscribe(() => {
      this.emergencyClose();
    })
  }

  ngOnInit(): void {
    this.http.get('http://127.0.0.1:8000/reports/button_def/').toPromise().then((e: any[]) => {
      if (e) {
        console.log('buttons groups here')
        console.log(e)
        var len = e.length
        console.log(len)
        console.log(this.Drop_Down_1)
        for (var x = 0; x < len; x++) {

          console.log((e[x]['first_dropdown']))
          this.Drop_Down_1.push((e[x]['first_dropdown']))
          this.Drop_Down_2.push((e[x]['second_dropdown']))
        }
        console.log(this.Drop_Down_1)
        console.log(this.Drop_Down_2)
        console.log('Look here darius')
        console.log(e[0]["report_name"])
        this.report_name = e[0]["report_name"]

      }


    }).catch(() => {
      console.log('fail')


      return false;
    });
    this.screen_width = window.screen.width
    this.sharedService.sharedSearch_Toggle.subscribe(Search_Toggle => this.Search_Toggle = Search_Toggle)
    this.sharedService.sharedSearch_Toggle_Advanced.subscribe(Search_Toggle => this.Advanced = Search_Toggle)
    // this.sharedService.sharedDrop_Down_Menu_1.subscribe(Drop_Down_1 => this.Drop_Down_1 = Drop_Down_1)
    this.sharedService.sharedDrop_Down_Menu_1_Item.subscribe(Drop_Down_1_Value_1 => this.Drop_Down_1_Value_1 = Drop_Down_1_Value_1)
    // this.sharedService.sharedDrop_Down_Menu_2.subscribe(Drop_Down_2 => this.Drop_Down_2 = Drop_Down_2)
    this.sharedService.sharedside_nav_open.subscribe(x => this.side_nav = x)
    this.sharedService.sharedgridColumnApi.subscribe(x => this.gridColumnApi = x)
    this.sharedService.sharedgridApi.subscribe(x => this.gridApi = x)
    this.sharedService.sharedColumnDefs.subscribe(x => this.columnDefs = x)
    this.sharedService.sharedTextSize.subscribe(x => this.textSize = x)
    this.sharedService.sharedWidth.subscribe(x => this.width = x)
    this.sharedService.sharedon_Style_Details.subscribe(x => this.on_Style_Details = x)
    this.sharedService.sharedsafe_File.subscribe(x => this.safe_File = x)
    this.defaultColDef = this.gridService.defualtColDef(this.width);

    // console.log("Button Section")
    // console.log(this.Drop_Down_2)
    // console.log(this.Drop_Down_2.first_field)
    // this.Second_Drop_Down_Fields_1 = this.Drop_Down_2.first_field;
    // this.Second_Drop_Down_Fields_2 = this.Drop_Down_2.first_field;

  }


  show() {
    // this.menu = this.gridService.hide(this.menu)
    this.sharedService.nextToggle(false)
    // console.log(this.Search_Toggle)
  }

  orientation(...params: any[]) {
    this.sharedService.nextreport_name(this.report_name)
    var grouping = params[0]
    var orient = params[1]

    if (grouping == "group1") {
      this.Orientation_1 = orient
      this.third_menu_value_1 = orient
    }
    if (grouping == "group2") {
      this.Orientation_2 = orient
      this.third_menu_value_2 = orient
    }
    if (grouping == "group3") {
      this.Orientation_3 = orient
      this.third_menu_value_3 = orient
    }

    this.sharedService.nextthird_menu_value_1(this.third_menu_value_1)
    this.sharedService.nextthird_menu_value_2(this.third_menu_value_2)
    this.sharedService.nextthird_menu_value_3(this.third_menu_value_3)
    this.sharedService.nextthird_menu_value(orient)
    this.sharedService.sendClickEvent2()
  }

  type_menu(...params: any[]) {
    this.sharedService.nextreport_name(this.report_name)
    console.log(params)
    var grouping = params[0]
    var type = params[1]
    var index = this.Drop_Down_1.indexOf(type) + 1;
    console.log(index)


    if (grouping == "group1") {
      this.Drop_Down_1_Value_1 = type
      // this.sharedService.nextDropDownMenuItem(type)

      this.Drop_Down_1_Index_1 = index
      this.Drop_Down_2_Value_1 = "Select"

      if (index) {
        console.log(type)
        console.log(index)
        var len = this.Drop_Down_2[index - 1].length

        this.Second_Drop_Down_Fields_1 = []
        for (var x = 0; x < len; x++) {
          console.log(this.Drop_Down_2[index - 1][x])
          this.Second_Drop_Down_Fields_1.push(this.Drop_Down_2[index - 1][x])
        }
      }

      this.first_menu_value_1 = type
    }

    if (grouping == "group2") {
      this.Drop_Down_1_Value_2 = type
      this.Drop_Down_1_Index_2 = index
      this.Drop_Down_2_Value_2 = "Select"
      if (index) {
        console.log(type)
        console.log(index)
        var len = this.Drop_Down_2[index - 1].length

        this.Second_Drop_Down_Fields_2 = []
        for (var x = 0; x < len; x++) {
          console.log(this.Drop_Down_2[index - 1][x])
          this.Second_Drop_Down_Fields_2.push(this.Drop_Down_2[index - 1][x])
        }

      }
      this.first_menu_value_2 = type

    }

    if (grouping == "group3") {
      this.Drop_Down_1_Value_3 = type
      this.Drop_Down_1_Index_3 = index
      this.Drop_Down_2_Value_3 = "Select"
      if (index) {
        console.log(type)
        console.log(index)
        var len = this.Drop_Down_2[index - 1].length

        this.Second_Drop_Down_Fields_3 = []
        for (var x = 0; x < len; x++) {
          console.log(this.Drop_Down_2[index - 1][x])
          this.Second_Drop_Down_Fields_3.push(this.Drop_Down_2[index - 1][x])
        }

      }

      this.first_menu_value_3 = type

    }

    this.sharedService.nextfirst_menu_value_1(this.first_menu_value_1)
    this.sharedService.nextfirst_menu_value_2(this.first_menu_value_2)
    this.sharedService.nextfirst_menu_value_3(this.first_menu_value_3)
    this.sharedService.sendClickEvent2()



  }




  select_menu(...params: any[]) {
    this.sharedService.nextreport_name(this.report_name)

    var grouping = params[0]
    var select_item = params[1]

    if (grouping == "group1") {
      this.Drop_Down_2_Value_1 = select_item
      this.second_menu_value_1 = select_item
    }
    if (grouping == "group2") {
      this.Drop_Down_2_Value_2 = select_item
      this.second_menu_value_2 = select_item
    }
    if (grouping == "group3") {
      this.Drop_Down_2_Value_3 = select_item
      this.second_menu_value_3 = select_item
    }
    console.log(select_item)
    this.sharedService.nextsecond_menu_value(select_item)
    this.sharedService.nextsecond_menu_value_1(this.second_menu_value_1)
    this.sharedService.nextsecond_menu_value_2(this.second_menu_value_2)
    this.sharedService.nextsecond_menu_value_3(this.second_menu_value_3)
    this.sharedService.sendClickEvent2()

  }


  add_subtract_new_section(...params: any[]) {
    var group = params[0]
    var show = params[1]
    console.log(params)
    if (group == "group2") {
      this.Second_Group = show
      if (show == false) {
        this.Third_Group = false
      }
    }

    if (group == "group3") {
      if (window.screen.width > 1599) {
        if (this.side_nav === true) {


          console.log('closed menu ')


          this.Third_Group = show
          this.sharedService.nextside_nav_open(false)
        }
        if (this.side_nav === false) {


          console.log('open menu')


          $("body").addClass('sidebar-collapse').trigger('collapsed.pushMenu');

          this.Third_Group = show
          this.sharedService.nextside_nav_open(true)

        }
      }
      else {
        alert('Screen is too small to fit another section of buttons')
      }

    }



  }

  emergencyClose() {
    this.sharedService.nextside_nav_open(false)
    this.Third_Group = false
  }


  clearall() {
    this.gridService.clearall(this.gridColumnApi, this.gridApi)

  }

  allInOne(offset: number) {
    console.log('press')
    this.gridService.allInOne(offset, this.textSize, this.width, this.columnDefs, this.gridApi, this.gridColumnApi)
  }

  clickedIt() {
    var canSee = $(".sidebar-collapse").is(":visible");
    alert(canSee);
  }

  startUpload() {
    this.sharedService.sendClickEvent4()
  }

  fileOverBase(event): void {
    this.hasBaseDropZoneOver = event;
  }

  onGridReady(params) {

    this.sharedService.sharedgridColumnApi.subscribe(x => this.gridColumnApi = x)
    this.sharedService.sharedgridApi.subscribe(x => this.gridApi = x)
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    console.log('worked')
    this.sharedService.nextGridApi(this.gridApi)
    this.sharedService.nextGridColumnApi(this.gridColumnApi)
  }

  open(content) {
    this.modalService.open(content);
  }

  getFiles(): FileLikeObject[] {
    return this.uploader.queue.map((fileItem) => {
      return fileItem.file;
    });
  }

  public onFileDrop(fileList: File[]) {
    console.log(fileList);// u get file as fileList[0]
  }

  upload(params) {

    if (this.safe_File.search('Company name,Brand,Department,Binding,Label,Product group,Product type,Category ID,Rank,Category,Sub Category,Parent asin,Asin id,Sku,Product id,Parent style,Style,Color,Size,Product cost,Fulfillment Channel,Fulfillment cost,Vendor,Lead time,Local warehouse quanty,Case pack,Status') != -1) {
      let files = this.getFiles();
      console.log('here is the files')
      console.log(files);
      let requests = [];
      let route: any
      files.forEach((file) => {
        console.log(file.name)
        if (file.name.search('.csv') != -1) {
          let formData = new FormData();

          formData.append('file', file.rawFile, file.name,);
          //only send the newset element

          requests.push(this.uploadService.upload(formData));

          route = true

        }
        else {
          route = false
        }

      },

      );

      var requests2 = []
      requests2.push(requests.pop())
      requests.splice(0, requests.length)
      console.log(requests2)
      if (route == true) {

        alert('Data is being updated please wait')



        this.sharedService.sendClickEvent4()

      }
      else {
        alert('Please upload a file with a .csv extension')
      }

      concat(...requests2).subscribe(

        (res) => {

          console.log(res);

          alert('Data has been updated')
          this.sharedService.sendClickEvent5()
          this.sharedService.sendClickEvent6(params)





        },
        (err) => {
          console.log(err);
        }
      );
    }
    else {
      alert('CSV file does not have the correct headers')
    }
  }

  helper_method() {
    console.log(this.safe_File)
  }



  onFileLoad(fileLoadedEvent: any) {
    const textFromFileLoaded = fileLoadedEvent.target.result;
    this.csvContent = textFromFileLoaded;
    if (this.csvContent.search('Company name,Brand,Department,Binding,Label,Product group,Product type,Category ID,Rank,Category,Sub Category,Parent asin,Asin id,Sku,Product id,Parent style,Style,Color,Size,Product cost,Fulfillment Channel,Fulfillment cost,Vendor,Lead time,Local warehouse quanty,Case pack,Status') != -1) {
      console.log(this.csvContent)

    }
    else {
      // this.safe_File = 'false'
      console.log(this.safe_File)


    }

  }

  fileChanged(e) {
    this.csvContent = e.target.files[0];
    console.log(this.csvContent)
    this.uploadDocument(e)
  }

  uploadDocument(file) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {

      console.log(fileReader.result);
      this.safe_File = fileReader.result
    }

    fileReader.readAsText(this.csvContent);


  }







}




