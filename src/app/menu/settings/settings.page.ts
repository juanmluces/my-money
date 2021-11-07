import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MoneyCycleService } from 'src/app/services/money-cycle.service';
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
    private storage: LocalStorageService,
    private alertCtrl: AlertController,
    private moneyCycle: MoneyCycleService
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
    this.sharedData.updateLang()
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

  async deleteData(){
   await this.presentAlertConfirm()
  }


  private async presentAlertConfirm() {

    // const exitTrans = await this.translate.get('closeApp.exit').toPromise()
    // const exitQuestionTrans = await this.translate.get('closeApp.exitApp').toPromise()
    // const cacelTrans = await this.translate.get('closeApp.cancel').toPromise()

    const alert = await this.alertCtrl.create({
      header: "¿Estás seguro?",
      message: 'Se borrarán todos los datos',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Confirmar',
          cssClass: 'exit-button',
          handler: () => {
            this.storage.deleteData()
            this.moneyCycle.deleteData()
          }
        }
      ]
    });

    await alert.present();
  }
  
}
