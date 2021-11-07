import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { PickerOptions } from '@ionic/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MoneyMovement } from 'src/app/models/moneyMovement.model';
import { MoneyCycleService } from 'src/app/services/money-cycle.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.modal.html',
  styleUrls: ['./expenses.modal.scss'],
})
export class ExpensesModal implements OnInit {

  customPickerOptions: PickerOptions;
  selectedDate: Date;
  formGroup: FormGroup
  modalTitle: string;
  @Input() expense: boolean;

  constructor(private modalCtrl: ModalController, public translate: TranslateService, private moneyCycle: MoneyCycleService) {
    this.modalTitle = ''
    this.selectedDate = new Date()
    this.formGroup = new FormGroup({
      description: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      date: new FormControl(this.selectedDate, Validators.required)

    })
   }

  ngOnInit() {
    this.modalTitle = this.expense ? 'expenses.newExpense' : 'expenses.newIncome'
    console.log(this.expense);
    
    this.setDatepickerOptions()
  }

  goBack(){
    this.modalCtrl.dismiss()
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

  selectDate(event){
    this.selectedDate = new Date(event.year.value, (event.month.value - 1), event.day.value)
    this.formGroup.get('date').setValue(this.selectedDate)
    
    console.log(this.selectedDate);
    
  }

  submitForm(){
    const params = {
      description: this.formGroup.get('description').value,
      movementDate: this.formGroup.get('date').value,
      amount: this.formGroup.get('amount').value,
      expense: this.expense
      
    }
    const movement = new MoneyMovement(params)
    this.moneyCycle.addMovementToActiveCycle(movement);
    this.modalCtrl.dismiss({movementAdded: true})
    
  }



}
