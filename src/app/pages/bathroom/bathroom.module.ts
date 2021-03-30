import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BathroomPageRoutingModule } from './bathroom-routing.module';

import { BathroomPage } from './bathroom.page';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BathroomPageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [BathroomPage]
})
export class BathroomPageModule {}
