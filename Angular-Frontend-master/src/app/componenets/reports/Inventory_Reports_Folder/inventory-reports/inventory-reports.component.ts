import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-inventory-reports',
  templateUrl: './inventory-reports.component.html',
  styleUrls: ['./inventory-reports.component.scss']
})
export class InventoryReportsComponent implements OnInit {
  Title = 'Iventory Report'
  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("Inventory report");
  }

}
