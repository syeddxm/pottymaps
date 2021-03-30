import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateToTimePipe } from './date-to-time.pipe';
import { OpenOrClosedPipe } from './open-or-closed.pipe';


@NgModule({
  declarations: [
    DateToTimePipe,
    OpenOrClosedPipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    DateToTimePipe,
    OpenOrClosedPipe
  ]
})
export class PipesModule { }
