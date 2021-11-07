import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MoneyCycle } from '../models/moneyCycle.model';
import { MoneyMovement } from '../models/moneyMovement.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class MoneyCycleService {

  private userCycles: Array<MoneyCycle>;
  private activeCycle: MoneyCycle;
  private cycles$: Subject<boolean>;


  constructor(private storage: LocalStorageService) {
    this.userCycles = []
    this.activeCycle = null;
    this.cycles$ = new Subject()
  }
  
  cycleChanges$(): Observable<boolean>{
    return this.cycles$.asObservable()
  }

  getActiveCycle(): MoneyCycle {
    return this.activeCycle;
  }

  getAllCycles(): Array<MoneyCycle>{
    return this.userCycles;
  }

  setAllCycles(params: Array<MoneyCycle>){
   

      this.userCycles = params;
      const activeCycle = this.userCycles.find(cycle => !cycle.isClosed)    
      if(activeCycle) this.activeCycle = activeCycle;
      this.cycles$.next(true)
  
  
  }

  startCycle(cycle: MoneyCycle){
    this.activeCycle = cycle;
    this.userCycles.push(this.activeCycle)
    this.storage.set('cycles', this.userCycles)
  }

  closeCurrentCycle(){
    const index = this.userCycles.findIndex(cycle => !cycle.isClosed)  
    this.activeCycle.isClosed = true;
    this.userCycles[index] = this.activeCycle;
    this.storage.set('cycles', this.userCycles)
    this.setAllCycles(this.userCycles);
  }

  addMovementToActiveCycle(param: MoneyMovement){
    this.activeCycle.movements.push(param)
    this.getMoneyCycleStats(this.activeCycle)
    const index = this.userCycles.findIndex(cycle => !cycle.isClosed)  
    this.userCycles[index] = this.activeCycle;
    this.storage.set('cycles', this.userCycles)
    this.cycles$.next(true)

  }

  private getMoneyCycleStats(moneyCycle: MoneyCycle){
 
      let income = 0;
      let expenses = 0;
      let total = 0;
      moneyCycle.movements.forEach(movement => {
        if(movement.expense){
          expenses += movement.amount
        } else{
          income += movement.amount
        }
      })
      total = income - expenses
      moneyCycle.totalBalance = total;
      moneyCycle.totalIncome = income;
      moneyCycle.totalExpenses = expenses
    
  }
}
