import { MoneyMovement } from "./moneyMovement.model";

export class MoneyCycle {
  startDate: string;
  endDate?: string;
  movements?: Array<MoneyMovement>
  totalIncome?: number;
  totalExpenses?: number;
  totalBalance?: number;
  isClosed?: boolean;

  constructor(params?: MoneyCycle){
    this.startDate = "";
    this.endDate = "";
    this.movements = [];
    this.totalIncome = 0;
    this.totalExpenses = 0;
    this.totalBalance = 0;
    this.isClosed = false;
    if(params) Object.assign(this, params)
    
  }

  
}