import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private subject = new Subject<any>();
  private subject1 = new Subject<any>();
  private subject2 = new Subject<any>();
  private subject3 = new Subject<any>();
  private subject4 = new Subject<any>();
  private subject5 = new Subject<any>();
  private subject6 = new Subject<any>();

  private report_type = new BehaviorSubject('Dashboard')
  private Search_Toggle = new BehaviorSubject(false)
  private Search_Toggle_Advanced = new BehaviorSubject(false)
  private Drop_Down_Menu_1 = new BehaviorSubject([])
  private Drop_Down_Menu_1_Item = new BehaviorSubject("")
  private Drop_Down_Menu_2 = new BehaviorSubject([])
  private gridColumnApi = new BehaviorSubject([])
  private gridApi = new BehaviorSubject([])
  private textSize = new BehaviorSubject([])
  private width = new BehaviorSubject([])
  private columnDefs = new BehaviorSubject([])

  private first_menu_value_1 = new BehaviorSubject([])
  private second_menu_value_1 = new BehaviorSubject([])
  private third_menu_value_1 = new BehaviorSubject([])

  private first_menu_value_2 = new BehaviorSubject([])
  private second_menu_value_2 = new BehaviorSubject([])
  private third_menu_value_2 = new BehaviorSubject([])

  private first_menu_value_3 = new BehaviorSubject([])
  private second_menu_value_3 = new BehaviorSubject([])
  private third_menu_value_3 = new BehaviorSubject([])

  private side_nav_open = new BehaviorSubject(false)
  private url_prefix = new BehaviorSubject<string>('http://127.0.0.1:8000/')
  private on_Style_Details = new BehaviorSubject(false)
  private safe_File = new BehaviorSubject(false)

  private first_menu_value = new BehaviorSubject([])
  private second_menu_value = new BehaviorSubject([])
  private third_menu_value = new BehaviorSubject([])
  private report_name = new BehaviorSubject([])

  sharedreport_type = this.report_type.asObservable()
  sharedurl_prefix = this.url_prefix.asObservable()
  sharedgridColumnApi = this.gridColumnApi.asObservable()
  sharedgridApi = this.gridApi.asObservable()
  sharedSearch_Toggle_Advanced = this.Search_Toggle_Advanced.asObservable()
  sharedSearch_Toggle = this.Search_Toggle.asObservable()
  sharedDrop_Down_Menu_1 = this.Drop_Down_Menu_1.asObservable()
  sharedDrop_Down_Menu_1_Item = this.Drop_Down_Menu_1_Item.asObservable()
  sharedDrop_Down_Menu_2 = this.Drop_Down_Menu_2.asObservable()
  sharedTextSize = this.textSize.asObservable()
  sharedWidth = this.width.asObservable()
  sharedColumnDefs = this.columnDefs.asObservable()
  sharedfirst_menu_value_1 = this.first_menu_value_1.asObservable()
  sharedsecond_menu_value_1 = this.second_menu_value_1.asObservable()
  sharedthird_menu_value_1 = this.third_menu_value_1.asObservable()
  sharedfirst_menu_value_2 = this.first_menu_value_2.asObservable()
  sharedsecond_menu_value_2 = this.second_menu_value_2.asObservable()
  sharedthird_menu_value_2 = this.third_menu_value_2.asObservable()
  sharedfirst_menu_value_3 = this.first_menu_value_3.asObservable()
  sharedsecond_menu_value_3 = this.second_menu_value_3.asObservable()
  sharedthird_menu_value_3 = this.third_menu_value_3.asObservable()
  sharedside_nav_open = this.side_nav_open.asObservable()
  sharedon_Style_Details = this.on_Style_Details.asObservable()
  sharedsafe_File = this.safe_File.asObservable()
  sharedfirst_menu_value = this.first_menu_value.asObservable()
  sharedsecond_menu_value = this.second_menu_value.asObservable()
  sharedthird_menu_value = this.third_menu_value.asObservable()
  sharedreport_name = this.report_name.asObservable()
  //search menu
  sendClickEvent() {
    console.log("Shared Service Click Event 1")
    this.subject.next();
  }
  //search menu 
  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  //search buttons
  sendClickEvent2() {
    console.log("Shared Service Click Event 2")
    this.subject1.next();
  }
  //search buttons
  getClickEvent2(): Observable<any> {
    return this.subject1.asObservable();
  }

  //header search menu
  sendClickEvent3() {
    return this.subject2.next();
  }

  //header to BUTTONS
  getClickEvent3(): Observable<any> {
    return this.subject2.asObservable();
  }

  sendClickEvent4() {
    console.log('shared service click event')
    this.subject3.next()
  }

  getClickEvent4(): Observable<any> {
    return this.subject3.asObservable();
  }

  sendClickEvent5() {
    console.log('shared service click event')
    this.subject4.next()
  }

  getClickEvent5(): Observable<any> {
    return this.subject4.asObservable();
  }

  sendClickEvent6(params) {
    console.log('shared service click event')
    this.subject5.next(params)
  }

  getClickEvent6(): Observable<any> {
    return this.subject5.asObservable();
  }

  sendClickEvent7() {
    console.log('shared service click event')
    this.subject6.next()
  }

  getClickEvent7(): Observable<any> {
    return this.subject6.asObservable();
  }

  constructor(config: NgbModalConfig, private modalService: NgbModal) { }

  nextToggle(placeholder: boolean) {
    this.Search_Toggle.next(placeholder)
    console.log("Shared Service:")
    console.log(placeholder)
  }

  nextToggleAdvanced(placeholder: boolean) {
    this.Search_Toggle_Advanced.next(placeholder)
  }

  nextDropDownMenu(placeholder: Array<string>) {
    this.Drop_Down_Menu_1.next(placeholder)
  }

  nextDropDownMenuItem(placeholder: string) {
    this.Drop_Down_Menu_1_Item.next(placeholder)
    console.log("Shared Service")
    console.log(placeholder)

  }


  nextDropDownMenu2(placeholder: any) {
    this.Drop_Down_Menu_2.next(placeholder)
  }

  nextGridColumnApi(placeholder: any) {
    this.gridColumnApi.next(placeholder)
  }

  nextGridApi(placeholder: any) {
    this.gridApi.next(placeholder)
  }

  nextWidth(placeholder: any) {
    this.width.next(placeholder)
  }

  nextTextSize(placeholder: any) {
    this.textSize.next(placeholder)
  }

  nextColumnDef(placeholder: any) {
    this.columnDefs.next(placeholder)
  }

  // FIRST BUTTON GROUP //

  nextfirst_menu_value_1(placeholder: any) {
    this.first_menu_value_1.next(placeholder)
  }

  nextsecond_menu_value_1(placeholder: any) {
    this.second_menu_value_1.next(placeholder)
  }

  nextthird_menu_value_1(placeholder: any) {
    this.third_menu_value_1.next(placeholder)
  }

  // SECOND BUTTON GROUP //

  nextfirst_menu_value_2(placeholder: any) {
    this.first_menu_value_2.next(placeholder)
  }

  nextsecond_menu_value_2(placeholder: any) {
    this.second_menu_value_2.next(placeholder)
  }

  nextthird_menu_value_2(placeholder: any) {
    this.third_menu_value_2.next(placeholder)
  }

  // THIRD BUTTON GROUP //

  nextfirst_menu_value_3(placeholder: any) {
    this.first_menu_value_3.next(placeholder)
  }

  nextsecond_menu_value_3(placeholder: any) {
    this.second_menu_value_3.next(placeholder)
  }

  nextthird_menu_value_3(placeholder: any) {
    this.third_menu_value_3.next(placeholder)
  }

  nextside_nav_open(placeholder: any) {
    this.side_nav_open.next(placeholder)
  }

  nexton_Style_Details(placeholder: any) {
    this.on_Style_Details.next(placeholder)
  }

  nextsafe_File(placeholder: any) {
    this.safe_File.next(placeholder)
  }

  nextreport_type(placeholder: any) {
    this.report_type.next(placeholder)
  }

  nextfirst_menu_value(placeholder: any) {
    this.first_menu_value_1.next(placeholder)
  }

  nextsecond_menu_value(placeholder: any) {
    this.second_menu_value_2.next(placeholder)
  }

  nextthird_menu_value(placeholder: any) {
    this.third_menu_value.next(placeholder)
  }
  nextreport_name(placeholder: any) {
    this.report_name.next(placeholder)
  }

}
