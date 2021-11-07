import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoneyCycle } from 'src/app/models/moneyCycle.model';
import { MoneyCycleService } from 'src/app/services/money-cycle.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  tabTitle = 'home.title'
  date: Date;
  formatedDate: string;
  updateDate: boolean;
  currentCycle: MoneyCycle;

  constructor(
    private sharedData: SharedDataService,
    private router: Router,
    private moneyCycles: MoneyCycleService
  ) { 
    this.date = new Date()
    this.formatedDate = '';
    this.updateDate = false
  }

  ngOnInit() {
    this.sharedData.translate$().subscribe(lang => {
     this.updateDate = !this.updateDate
    });
    this.moneyCycles.cycleChanges$().subscribe(chang => {
      this.getActiveCycle()
    })
    this.getActiveCycle()
  }
  
  ionViewWillEnter() {
    this.sharedData.setTabTitle(this.tabTitle)
  }

  tabNav(tabName: string, states: any = null){
    this.sharedData.createNewCycle()
    this.router.navigate(['tabs',tabName], { queryParams: states})

  }
  getActiveCycle(){
    const activeCycle = this.moneyCycles.getActiveCycle()
    if(activeCycle) this.currentCycle = activeCycle
  }

}
