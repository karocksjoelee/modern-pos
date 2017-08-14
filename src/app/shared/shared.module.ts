import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberFilterPipe } from './member-filter.pipe';

@NgModule({
  imports: [
  ],
  declarations: [
    MemberFilterPipe
  ],
  exports: [
    MemberFilterPipe
  ]
})
export class SharedModule { }
