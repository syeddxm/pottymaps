import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MapComponent} from './map/map.component';
import {ListComponent} from './list/list.component';
import {BottomDrawerComponent} from './bottom-drawer/bottom-drawer.component';
import {LocationCardComponent} from './location-card/location-card.component';
import {StarsComponent} from './stars/stars.component';
import {TimingChipComponent} from './timing-chip/timing-chip.component';
import {MenuComponent} from './menu/menu.component';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {ReviewsComponent} from './reviews/reviews.component';
import { FormsModule } from '@angular/forms';


import { AgmCoreModule } from '@agm/core';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    MapComponent,
    BottomDrawerComponent,
    StarsComponent,
    TimingChipComponent,
    MenuComponent,
    ReviewsComponent,
    ListComponent,
    LocationCardComponent,
    SearchBarComponent
  ],
  imports: [
    CommonModule,
    AgmCoreModule,
    IonicModule,
    PipesModule,
    FormsModule
  ],
  exports: [
    MapComponent,
    BottomDrawerComponent,
    StarsComponent,
    TimingChipComponent,
    MenuComponent,
    ReviewsComponent,
    ListComponent,
    LocationCardComponent,
    SearchBarComponent
  ]
})
export class ComponentsModule { }
