import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  pageTitle: string; 
  darkMode: boolean;
  selectedLang: string;

  constructor(
    private sharedData: SharedDataService,
    public translate: TranslateService
  ) {
    this.pageTitle = 'menu.settings'
    this.darkMode = false;
    this.selectedLang = this.translate.currentLang;
   }

  ngOnInit() {
    if(this.darkMode){
      document.body.classList.remove('light')
      document.body.classList.add('dark')
    }
    
  }
  
  ionViewWillEnter() {
    this.sharedData.setTabTitle(this.pageTitle)
    console.log(this.translate.currentLang);
  }

  changeLang(event){
    const value: string = event.detail.value;
    this.translate.use(value)
  }

  changeMode(){

    if(this.darkMode){
      document.body.classList.remove('light')
      document.body.classList.add('dark')
    } else{
      document.body.classList.add('light')
      document.body.classList.remove('dark')
    }
    
  }

  
}
