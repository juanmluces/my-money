import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SharedDataService } from './services/shared-data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  tabTitle: string;


  constructor(
    private translate: TranslateService,
    private sharedData: SharedDataService
  ) {
    this.translate.setDefaultLang('es')
    this.tabTitle =  sharedData.getTabTitle()
  }

  async ngOnInit(){
    this.sharedData.tabTitle$().subscribe(title => this.tabTitle = title)

  }
}
