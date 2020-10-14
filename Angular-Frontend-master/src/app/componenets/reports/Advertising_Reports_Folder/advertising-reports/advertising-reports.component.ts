import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-advertising-reports',
  templateUrl: './advertising-reports.component.html',
  styleUrls: ['./advertising-reports.component.scss']
})
export class AdvertisingReportsComponent implements OnInit {
  Title = 'Advertising Report';
  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("Advertising report");
  }

}
