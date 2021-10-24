import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  tabTitle = 'home.title'

  constructor(
    private sharedData: SharedDataService
  ) { }

  ngOnInit() {}
  
  ionViewWillEnter() {
    this.sharedData.setTabTitle(this.tabTitle)
  }

}
