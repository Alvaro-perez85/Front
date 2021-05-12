import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainDataPageRoutingModule } from './main-data-routing.module';

import { ReactiveFormsModule } from '@angular/forms';

import { MainDataPage } from './main-data.page';

import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainDataPageRoutingModule,
    ReactiveFormsModule,
    IonicSelectableModule
  ],
  declarations: [MainDataPage]
})
export class MainDataPageModule {}
