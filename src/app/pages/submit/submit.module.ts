import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubmitPageRoutingModule } from './submit-routing.module';

import { SubmitPage } from './submit.page';

import { ComponentsModule } from '../../components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubmitPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [SubmitPage]
})
export class SubmitPageModule {}
