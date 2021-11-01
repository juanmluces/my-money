import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoneyPageRoutingModule } from './money-routing.module';

import { MoneyPage } from './money.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoneyPageRoutingModule,
    TranslateModule
  ],
  declarations: [MoneyPage]
})
export class MoneyPageModule {}
