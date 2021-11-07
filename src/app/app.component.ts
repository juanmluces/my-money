import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from './services/local-storage.service';
import { MoneyCycleService } from './services/money-cycle.service';
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
    private sharedData: SharedDataService,
    private platform: Platform,
    private router: Router,
    public alertController: AlertController,
    private stroage: LocalStorageService,
    private moneyCycle: MoneyCycleService
  ) {
    this.initializeApp();
    this.translate.setDefaultLang('es');
    this.tabTitle =  sharedData.getTabTitle();
  }

  async ngOnInit(){
    this.sharedData.tabTitle$().subscribe(title => this.tabTitle = title)

  }

  async initializeApp() {

    this.changeDarkMode();
    const lang = await this.stroage.get('lang') || this.translate.getDefaultLang()
    this.translate.use(lang)
    const userCycles = await this.stroage.get('cycles')
    if(userCycles) this.moneyCycle.setAllCycles(userCycles)

    this.platform.backButton.subscribeWithPriority(0, async () => {
    
      this.sharedData.backButtonPressed(true)
      setTimeout(()=>{ this.sharedData.backButtonPressed(false)}, 0)
      const url = this.router.url    
      if(url == "/tabs/home"){
        await this.presentAlertConfirm()
      } else{
        await this.router.navigate(['tabs', 'home'])
      }
    });
  }

  async presentAlertConfirm() {

    const exitTrans = await this.translate.get('closeApp.exit').toPromise()
    const exitQuestionTrans = await this.translate.get('closeApp.exitApp').toPromise()
    const cacelTrans = await this.translate.get('closeApp.cancel').toPromise()

    const alert = await this.alertController.create({
      header: exitTrans,
      message: exitQuestionTrans,
      buttons: [
        {
          text: cacelTrans,
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: exitTrans,
          cssClass: 'exit-button',
          handler: () => {
            console.log('Confirm Okay');
            navigator['app'].exitApp();
          }
        }
      ]
    });

    await alert.present();
  }

  async changeDarkMode(){

    const darkMode = await this.stroage.get('darkMode') ?? true
    document.body.classList.add(darkMode ? 'dark' : 'light')
    this.stroage.set('darkMode', darkMode)

  }


}
