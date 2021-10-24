import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  tabTitle = 'detail.title'

  constructor(
    private sharedData: SharedDataService
  ) { }

  ngOnInit() {}
  
  ionViewWillEnter() {
    this.sharedData.setTabTitle(this.tabTitle)
  }
}
