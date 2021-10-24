import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  pageTitle = 'settings.title'

  constructor(
    private sharedData: SharedDataService
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.sharedData.setTabTitle(this.pageTitle)
  }
}
