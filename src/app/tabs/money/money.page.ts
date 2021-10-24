import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-money',
  templateUrl: './money.page.html',
  styleUrls: ['./money.page.scss'],
})
export class MoneyPage implements OnInit {

  tabTitle: string;

  constructor(
    private sharedData: SharedDataService
  ) { 
    this.tabTitle = 'money.title'
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.sharedData.setTabTitle(this.tabTitle)
  }
}
