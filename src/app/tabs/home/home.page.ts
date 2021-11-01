import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';
import * as moment from 'moment'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  tabTitle = 'home.title'
  date: Date;
  formatedDate: string;

  constructor(
    private sharedData: SharedDataService,
    private router: Router,
    private translate: TranslateService
  ) { 
    this.date = new Date()
    this.formatedDate = ''
  }

  ngOnInit() {
    this.sharedData.translate$().subscribe(lang => {
      this.dateLanguage(lang)
    })
  }
  
  ionViewWillEnter() {
    this.dateLanguage(this.translate.currentLang)
    this.sharedData.setTabTitle(this.tabTitle)
  }

  tabNav(tabName: string, states: any = null){
    this.router.navigate(['tabs',tabName], {state: states})

  }

  dateLanguage(lang: string){
    this.formatedDate =  lang == 'es' ? moment(this.date).locale('es').format('dddd DD MMM YYYY') : moment(this.date).locale('en').format('dddd MMM DD YYYY')
  }

}
