import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMapComponent } from './main-map/main-map.component';
import { MainListComponent } from './main-list/main-list.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { SubmitMapComponent } from './submit-map/submit-map.component';
import { SubmitFormComponent } from './submit-form/submit-form.component';
import { DateSelectorComponent } from './date-selector/date-selector.component';
import { BottomDrawerComponent } from './bottom-drawer/bottom-drawer.component';
import { LocationCardComponent } from './location-card/location-card.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { TimingChipComponent } from './timing-chip/timing-chip.component';
import { StarReviewComponent } from './star-review/star-review.component';
import { StarsComponent } from './stars/stars.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewInputComponent } from './review-input/review-input.component';
import { IonicModule } from '@ionic/angular';
// import { PipesModule } from '../pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { AgmJsMarkerClustererModule, ClusterManager } from '@agm/js-marker-clusterer';


@NgModule({
  declarations: [
    MainMapComponent,
    SubmitMapComponent,
    SearchBarComponent,
    BottomDrawerComponent,
    LocationCardComponent,
    StarsComponent,
    StarReviewComponent,
    TimingChipComponent,
    ReviewsComponent,
    SubmitFormComponent,
    DateSelectorComponent,
    MainListComponent,
    MainMenuComponent,
    ReviewInputComponent
  ],
  imports: [
    CommonModule,
    AgmCoreModule,
    AgmJsMarkerClustererModule,
    IonicModule,
    // PipesModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    MainMapComponent,
    SubmitMapComponent,
    SearchBarComponent,
    BottomDrawerComponent,
    LocationCardComponent,
    StarsComponent,
    StarReviewComponent,
    TimingChipComponent,
    ReviewsComponent,
    SubmitFormComponent,
    DateSelectorComponent,
    MainListComponent,
    MainMenuComponent,
    ReviewInputComponent
  ]
})
export class ComponentsModule { }
