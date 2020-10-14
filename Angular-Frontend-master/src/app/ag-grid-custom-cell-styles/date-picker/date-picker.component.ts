import { Component, OnInit } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',

})
export class DatePickerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
