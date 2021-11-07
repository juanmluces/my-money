import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpensesModal } from './expenses.modal';
import { ExpensesModalRoutingModule } from './expenses-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from 'src/app/pipes/pipes.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpensesModalRoutingModule,
    TranslateModule,
    PipesModule,
    ReactiveFormsModule
  ],
  declarations: [ExpensesModal]
})
export class ExpensesModalModule {}
