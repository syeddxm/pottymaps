import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConvertUnitPipe } from './convertUnit/convert-unit.pipe';
import { ToHourAndMinutesPipe } from './toHourAndMinutes/to-hour-and-minutes.pipe';
import { OpenClosedOrClosingPipe } from './openClosedOrClosing/open-closed-or-closing.pipe';

@NgModule({
  declarations: [
    ConvertUnitPipe,
    ToHourAndMinutesPipe,
    OpenClosedOrClosingPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ConvertUnitPipe,
    ToHourAndMinutesPipe,
    OpenClosedOrClosingPipe
  ]
})
export class PipesModule { }
