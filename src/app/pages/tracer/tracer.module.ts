import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TracerPageRoutingModule } from './tracer-routing.module';

import { TracerPage } from './tracer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TracerPageRoutingModule
  ],
  declarations: [TracerPage]
})
export class TracerPageModule {}
