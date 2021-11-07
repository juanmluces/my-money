import { OnInit, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment'

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform, OnInit {

  lang: string
  constructor(private translate: TranslateService){
    this.lang = this.translate.currentLang
  }

  ngOnInit(){
    
  }

  transform(date: Date | string): string {
    let dateStr =  this.lang == 'es' ? moment(date).locale('es').format('dddd DD MMM YYYY') : moment(date).locale('en').format('dddd MMM DD YYYY');
    dateStr = dateStr.charAt(0).toUpperCase() + dateStr.slice(1)
    return dateStr
  }

}
