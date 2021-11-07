import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpensesModal } from './expenses.modal';


const routes: Routes = [
  {
    path: '',
    component: ExpensesModal
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpensesModalRoutingModule {}
