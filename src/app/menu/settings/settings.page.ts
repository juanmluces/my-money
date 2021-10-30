import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
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
    public translate: TranslateService,
    private storage: LocalStorageService
  ) {
    this.pageTitle = 'menu.settings'
    this.darkMode = false;
    this.selectedLang = this.translate.currentLang;
   }

  async ngOnInit() {
    this.darkMode = await this.storage.get('darkMode')
    
  }
  
  ionViewWillEnter() {
    this.sharedData.setTabTitle(this.pageTitle)
  }

  changeLang(event){
    const value: string = event.detail.value;
    this.translate.use(value)
    this.storage.set('lang', value)
  }

  changeMode(){

    if(this.darkMode){
      document.body.classList.remove('light')
      document.body.classList.add('dark')
    } else{
      document.body.classList.add('light')
      document.body.classList.remove('dark')
    }
    this.storage.set('darkMode', this.darkMode)
    
    
  }

  
}
