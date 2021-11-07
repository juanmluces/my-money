export class MoneyMovement{
  movementDate: string;
  expense: boolean;
  amount: number;
  description: string;

  constructor(params: MoneyMovement){
    Object.assign(this, params)
  }
}