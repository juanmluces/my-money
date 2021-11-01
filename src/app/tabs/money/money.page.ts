import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SharedDataService } from 'src/app/services/shared-data.service';
import * as moment from 'moment'
import { MoneyCycle } from 'src/app/models/moneyCycle.model';
import { AlertController, IonDatetime } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';

@Component({
  selector: 'app-money',
  templateUrl: './money.page.html',
  styleUrls: ['./money.page.scss'],
})
export class MoneyPage implements OnInit {

  tabTitle: string;
  transMonths: Array<string>;
  currentCycle: boolean;
  customPickerOptions: PickerOptions;
  startCycle: boolean;

  @ViewChild('datePicker', {static: true}) datePicker: IonDatetime

  constructor(
    private sharedData: SharedDataService,
    public translate: TranslateService,
    private alertCtr: AlertController
  ) { 
    this.tabTitle = 'money.title'
    this.currentCycle = false
    this.setDatepickerOptions()
   

  }

  async ngOnInit() {
    this.sharedData.translate$().subscribe(lang => this.setDatepickerOptions())
    
 
  }

  ionViewWillEnter(){
    this.sharedData.setTabTitle(this.tabTitle)
  }

  openDatepicker(start: boolean = false){
      this.startCycle = start;
      this.datePicker.value = moment(new Date()).toISOString();
      this.datePicker.open()
  }

  selectDate(event){
    const selectedDate = new Date(event.year.value, (event.month.value - 1), event.day.value)
    const stringDate = moment(selectedDate).toISOString();
    if(!this.startCycle)  {
      this.closeCycle(stringDate);
      return
    }

    const moneyCycle = new MoneyCycle({startDate: moment(stringDate).format('DD/MM/YYYY')})
    console.log(JSON.stringify({newCycle: moneyCycle}));
    
    this.currentCycle = true;
    
  }

  async setDatepickerOptions(){
    const selectTrans = await this.translate.get('money.select').toPromise()
    const cancelTrans = await this.translate.get('money.cancel').toPromise()
    this.customPickerOptions = {
      buttons: [
        {
          text: cancelTrans,
          cssClass: 'cancel-btn',
        }, 
        {
          text: selectTrans,
          handler: ($event) => this.selectDate($event)
        }
      ]
    }
  }

  
  
  async closeCycle(date?: string) {
    const transRaw = ['money.areYouSure','money.cancel','money.cambiarFecha','money.closingDate','money.confirm']
    const trans = await this.translate.get(transRaw).toPromise()

    const areYouSureTrans = trans[transRaw[0]]
    const cancelTrans = trans[transRaw[1]]
    const cambiarFechaTrans =  trans[transRaw[2]]
    const closingDateTrans =  trans[transRaw[3]]
    const confirmTrans =  trans[transRaw[4]]

    const momentDate  = moment(date ?? new Date())
    let today = this.translate.currentLang == 'es' ? momentDate.locale('es-es').format('DD MMMM yyyy') : momentDate.format('MMMM DD yyyy')
    const alert = await this.alertCtr.create({
      cssClass: 'close-cycle-alert',
      header: areYouSureTrans,
      message: `${closingDateTrans}: <br /><br />` + today,
      buttons: [
        {
          text: cancelTrans,
          role: 'cancel',
          cssClass: 'danger'
        },
        {
          text: cambiarFechaTrans,
          handler: () => this.openDatepicker(false)
        },
        
        {
          text: confirmTrans,
          handler: () => this.cycleClosed()
        }
      ]
    });

    await alert.present();
  }


  cycleClosed(){
    this.currentCycle = false;
  }
 
}
