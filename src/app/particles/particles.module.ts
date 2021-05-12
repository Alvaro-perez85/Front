import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParticlesPageRoutingModule } from './particles-routing.module';

import { ReactiveFormsModule } from '@angular/forms';

import { ParticlesPage } from './particles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ParticlesPageRoutingModule
  ],
  declarations: [ParticlesPage]
})
export class ParticlesPageModule {}
