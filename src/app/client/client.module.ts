import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientPageRoutingModule } from './client-routing.module';

import { ClientPage } from './client.page';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MaintenanceEditorComponent } from './../components/maintenance-editor/maintenance-editor.component';
import { ParticlesComponent } from '../components/particles/particles.component';
import { LaminarityComponent} from '../components/laminarity/laminarity.component';
import { TightnessComponent } from '../components/tightness/tightness.component';
import { PreasureComponent } from '../components/preasure/preasure.component';
import { RecirculationComponent } from '../components/recirculation/recirculation.component';
import { OthersComponent } from '../components/others/others.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ClientPageRoutingModule,
    NgbModule
  ],
  declarations: [ClientPage,
                 MaintenanceEditorComponent,
                 ParticlesComponent,
                 LaminarityComponent,
                 TightnessComponent,
                 RecirculationComponent,
                 OthersComponent,
                 PreasureComponent],
  exports: [MaintenanceEditorComponent]
})
export class ClientPageModule {}
