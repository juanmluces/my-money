export class MoneyCycle {
  startDate: string;
  endDate?: string;
  movements?: Array<any>
  totalIncome?: number;
  totalExpenses?: number;
  totalBalance?: number;

  constructor(params?: MoneyCycle){
    this.startDate = "";
    this.endDate = "";
    this.movements = [];
    this.totalIncome = 0;
    this.totalExpenses = 0;
    this.totalBalance = 0;
    if(params) Object.assign(this, params)
    
  }
}