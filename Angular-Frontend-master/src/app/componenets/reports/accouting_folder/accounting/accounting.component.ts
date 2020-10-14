import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.scss']
})
export class AccountingComponent implements OnInit {
  title = 'Accounting Report';
  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("Accounting Report");
  }

}
