import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  tabTitle = 'menu.about'
  appVersion = environment.appVersion
  ionicVersion = environment.ionicVersion
  angularVersion = environment.angularVersion

  constructor(
    private sharedData: SharedDataService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.sharedData.setTabTitle(this.tabTitle)
 
  }

  navigateWeb(site: string){
    window.open(site, "_system");
  }

}
